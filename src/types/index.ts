export type CareerGoal =
  | "Web Developer"
  | "Data Analyst"
  | "AI/ML Engineer"
  | "Software Developer"
  | "UI/UX Designer"
  | string;

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type DailyStudyTime = "30 min" | "1 hour" | "2 hours" | "3+ hours";

export interface UserProfile {
  name: string;
  goal: CareerGoal;
  level: SkillLevel;
  dailyStudyTime: DailyStudyTime;
  topics: string[];
}

export interface AssessmentOption {
  id: string;
  label: string;
  /** Partial-credit weight 0–100. Correct answer = 100, plausible distractors get partial credit. */
  weight: number;
}

export interface AssessmentQuestion {
  id: string;
  skill: string;
  question: string;
  options: AssessmentOption[];
  correctOptionId: string;
}

export interface AssessmentAnswer {
  questionId: string;
  selectedOptionId: string;
  correct: boolean;
}

export interface SkillScore {
  skill: string;
  score: number;
  total: number;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  baseHours: number;
  status: "completed" | "in-progress" | "locked";
}

export interface TodayLearningItem {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
}

export interface LearningPathResult {
  skillScores: SkillScore[];
  weakestSkill: string;
  roadmap: RoadmapModule[];
  todayLearning: TodayLearningItem[];
  overallProgress: number;
  currentFocus: string;
}

export interface CareerPath {
  skills: string[];
  assessmentQuestions: AssessmentQuestion[];
  roadmap: RoadmapModule[];
}

export type AppView =
  | "landing"
  | "profile"
  | "assessment"
  | "skill-gap"
  | "roadmap"
  | "dashboard"
  | "edit-profile";
