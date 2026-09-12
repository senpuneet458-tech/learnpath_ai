import {
  UserProfile,
  AssessmentAnswer,
  AssessmentQuestion,
  SkillScore,
  RoadmapModule,
  TodayLearningItem,
  LearningPathResult,
} from "@/types";
import { ASSESSMENT_QUESTIONS } from "@/data/questions";
import { WEB_DEV_ROADMAP } from "@/data/roadmap";

function calculateSkillScores(
  answers: AssessmentAnswer[],
  questions: AssessmentQuestion[]
): SkillScore[] {
  const skillMap = new Map<string, { correct: number; total: number }>();

  for (const q of questions) {
    const entry = skillMap.get(q.skill) ?? { correct: 0, total: 0 };
    entry.total += 1;
    skillMap.set(q.skill, entry);
  }

  for (const a of answers) {
    const q = questions.find((qq) => qq.id === a.questionId);
    if (!q) continue;
    const entry = skillMap.get(q.skill);
    if (!entry) continue;
    if (a.correct) entry.correct += 1;
  }

  const scores: SkillScore[] = [];
  for (const [skill, { correct, total }] of skillMap) {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    scores.push({ skill, score: pct, total });
  }

  // Sort in the order of questions
  const skillOrder = questions.map((q) => q.skill);
  return scores.sort(
    (a, b) => skillOrder.indexOf(a.skill) - skillOrder.indexOf(b.skill)
  );
}

function findWeakestSkill(scores: SkillScore[]): string {
  if (scores.length === 0) return "Unknown";
  let lowest = scores[0];
  for (const s of scores) {
    if (s.score < lowest.score) lowest = s;
  }
  return lowest.skill;
}

function studyTimeMultiplier(dailyTime: string): number {
  switch (dailyTime) {
    case "30 min":
      return 2.0;
    case "1 hour":
      return 1.5;
    case "2 hours":
      return 1.0;
    case "3+ hours":
      return 0.7;
    default:
      return 1.0;
  }
}

function buildRoadmap(
  profile: UserProfile,
  weakestSkill: string,
  scores: SkillScore[]
): RoadmapModule[] {
  const multiplier = studyTimeMultiplier(profile.dailyStudyTime);

  // Clone and adapt
  let roadmap = WEB_DEV_ROADMAP.map((m) => ({ ...m }));

  // Filter roadmap to selected topics when possible (keep core modules)
  const selectedSet = new Set(profile.topics);
  roadmap = roadmap.filter((m) => {
    // Always keep portfolio + in-progress/completed, otherwise match topics
    if (m.id === "rm-portfolio") return true;
    return m.skills.some((s) => selectedSet.has(s));
  });

  // If filtering removed too much, fall back to full roadmap
  if (roadmap.length < 4) {
    roadmap = WEB_DEV_ROADMAP.map((m) => ({ ...m }));
  }

  // Reorder so the weakest skill's module comes earlier (after completed ones)
  const weakestModuleIdx = roadmap.findIndex((m) =>
    m.skills.includes(weakestSkill)
  );
  if (weakestModuleIdx > 0) {
    // Find the first non-completed index
    const firstNonCompleted = roadmap.findIndex(
      (m) => m.status !== "completed"
    );
    if (firstNonCompleted >= 0 && weakestModuleIdx > firstNonCompleted) {
      // Only reorder if the weakest module is locked (not completed)
      const weakestModule = roadmap[weakestModuleIdx];
      if (weakestModule.status === "locked") {
        roadmap.splice(weakestModuleIdx, 1);
        roadmap.splice(firstNonCompleted + 1, 0, weakestModule);
      }
    }
  }

  // Adjust estimated hours based on study time
  roadmap = roadmap.map((m) => ({
    ...m,
    baseHours: Math.round(m.baseHours * multiplier),
  }));

  // Determine statuses based on scores
  // A skill with score >= 80 means its module is completed
  // The lowest-scoring module that isn't completed becomes "in-progress"
  const completedSkills = new Set(
    scores.filter((s) => s.score >= 80).map((s) => s.skill)
  );

  let foundInProgress = false;
  for (const m of roadmap) {
    const moduleSkillsCompleted = m.skills.every((s) => completedSkills.has(s));
    if (moduleSkillsCompleted) {
      m.status = "completed";
    } else if (!foundInProgress) {
      m.status = "in-progress";
      foundInProgress = true;
    } else {
      m.status = "locked";
    }
  }

  // Make sure exactly one is in-progress (the one matching weakest skill if possible)
  if (!foundInProgress && roadmap.length > 0) {
    roadmap[0].status = "in-progress";
  }

  return roadmap;
}

function buildTodayLearning(
  profile: UserProfile,
  roadmap: RoadmapModule[]
): TodayLearningItem[] {
  const inProgress = roadmap.find((m) => m.status === "in-progress");
  if (!inProgress) return [];

  const dailyMinutes: Record<string, number> = {
    "30 min": 30,
    "1 hour": 60,
    "2 hours": 120,
    "3+ hours": 180,
  };
  const totalMin = dailyMinutes[profile.dailyStudyTime] ?? 60;

  // Split total time into 3 items
  const item1 = Math.round(totalMin * 0.35);
  const item2 = Math.round(totalMin * 0.4);
  const item3 = totalMin - item1 - item2;

  return [
    {
      id: `${inProgress.id}-t1`,
      title: `${inProgress.title}: Core Concepts`,
      duration: item1,
      completed: false,
    },
    {
      id: `${inProgress.id}-t2`,
      title: `${inProgress.title}: Hands-on Practice`,
      duration: item2,
      completed: false,
    },
    {
      id: `${inProgress.id}-t3`,
      title: `${inProgress.title}: Mini Challenge`,
      duration: item3,
      completed: false,
    },
  ];
}

function calculateOverallProgress(roadmap: RoadmapModule[]): number {
  if (roadmap.length === 0) return 0;
  const completed = roadmap.filter((m) => m.status === "completed").length;
  return Math.round((completed / roadmap.length) * 100);
}

function findCurrentFocus(roadmap: RoadmapModule[]): string {
  const inProgress = roadmap.find((m) => m.status === "in-progress");
  return inProgress?.title ?? "All caught up!";
}

/**
 * The core personalization engine.
 * Deterministic logic — easy to replace with a real AI API later.
 */
export function generateLearningPath(
  profile: UserProfile,
  answers: AssessmentAnswer[]
): LearningPathResult {
  const questions = ASSESSMENT_QUESTIONS;
  const skillScores = calculateSkillScores(answers, questions);
  const weakestSkill = findWeakestSkill(skillScores);
  const roadmap = buildRoadmap(profile, weakestSkill, skillScores);
  const todayLearning = buildTodayLearning(profile, roadmap);
  const overallProgress = calculateOverallProgress(roadmap);
  const currentFocus = findCurrentFocus(roadmap);

  return {
    skillScores,
    weakestSkill,
    roadmap,
    todayLearning,
    overallProgress,
    currentFocus,
  };
}
