import { useState } from "react";
import { UserProfile, LearningPathResult, TodayLearningItem } from "@/types";
import Button from "@/components/Button";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import SkillBar from "@/components/SkillBar";
import { Flame, Clock, Target, TrendingUp, CheckCircle2, Circle, ArrowRight, BookOpen, Zap } from "lucide-react";

interface DashboardProps {
  profile: UserProfile;
  path: LearningPathResult;
  todayLearning: TodayLearningItem[];
  streak: number;
  onUpdateTodayLearning: (items: TodayLearningItem[]) => void;
  onUpdatePath: (path: LearningPathResult) => void;
  onNavigate: (view: "roadmap" | "skill-gap" | "edit-profile") => void;
}

function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 18) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
}

export default function Dashboard({
  profile,
  path,
  todayLearning,
  streak,
  onUpdateTodayLearning,
  onUpdatePath,
  onNavigate,
}: DashboardProps) {
  const [completing, setCompleting] = useState(false);

  const completedToday = todayLearning.filter((t) => t.completed).length;
  const totalTodayMinutes = todayLearning.reduce((sum, t) => sum + t.duration, 0);
  const completedTodayMinutes = todayLearning
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.duration, 0);

  const dailyMinutesMap: Record<string, number> = {
    "30 min": 30,
    "1 hour": 60,
    "2 hours": 120,
    "3+ hours": 180,
  };
  const dailyTarget = dailyMinutesMap[profile.dailyStudyTime] ?? 120;

  const handleCompleteNext = () => {
    setCompleting(true);
    setTimeout(() => {
      const nextIdx = todayLearning.findIndex((t) => !t.completed);
      if (nextIdx === -1) {
        setCompleting(false);
        return;
      }
      const updated = todayLearning.map((t, idx) =>
        idx === nextIdx ? { ...t, completed: true } : t
      );
      onUpdateTodayLearning(updated);
      setCompleting(false);
    }, 400);
  };

  // Find current and next roadmap stages
  const currentStageIdx = path.roadmap.findIndex((m) => m.status === "in-progress");
  const currentStage = currentStageIdx >= 0 ? path.roadmap[currentStageIdx] : null;
  const nextStage = currentStageIdx >= 0 && currentStageIdx + 1 < path.roadmap.length
    ? path.roadmap[currentStageIdx + 1]
    : null;

  // If all today's items are done, mark current roadmap stage as completed
  const allTodayDone = todayLearning.length > 0 && todayLearning.every((t) => t.completed);

  const handleFinishStage = () => {
    if (!currentStage) return;
    const updatedRoadmap = path.roadmap.map((m, idx) => {
      if (idx === currentStageIdx) return { ...m, status: "completed" as const };
      if (idx === currentStageIdx + 1 && m.status === "locked")
        return { ...m, status: "in-progress" as const };
      return m;
    });

    const completedCount = updatedRoadmap.filter((m) => m.status === "completed").length;
    const overallProgress = Math.round((completedCount / updatedRoadmap.length) * 100);
    const newInProgress = updatedRoadmap.find((m) => m.status === "in-progress");

    onUpdatePath({
      ...path,
      roadmap: updatedRoadmap,
      overallProgress,
      currentFocus: newInProgress?.title ?? "All caught up!",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Greeting */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {getGreeting(profile.name)} <span className="inline-block animate-fade-in">👋</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's your learning snapshot for today.
          </p>
        </div>

        {/* Hero card */}
        <Card className="mb-6 overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-6 text-white shadow-xl shadow-blue-600/20 animate-fade-in-up sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-100">You're on your way to becoming a</p>
              <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{profile.goal}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-xs text-blue-100">Overall Progress</p>
                  <p className="text-2xl font-extrabold">{path.overallProgress}%</p>
                </div>
                <div className="h-10 w-px bg-white/20" />
                <div>
                  <p className="text-xs text-blue-100">Current Focus</p>
                  <p className="text-sm font-bold">{path.currentFocus}</p>
                </div>
              </div>
              <div className="mt-4 max-w-xs">
                <div className="mb-1 flex items-center justify-between text-xs text-blue-100">
                  <span>Roadmap Progress</span>
                  <span>{path.overallProgress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-700"
                    style={{ width: `${path.overallProgress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <Button
                onClick={handleCompleteNext}
                variant="secondary"
                disabled={completing || allTodayDone}
                className="border-0 bg-white text-blue-700 hover:bg-blue-50"
              >
                <Zap className="h-4 w-4" />
                {allTodayDone ? "All Done Today!" : "Continue Learning"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 animate-fade-in-up delay-100">
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Overall Progress"
            value={`${path.overallProgress}%`}
            accent="blue"
          />
          <StatCard
            icon={<Flame className="h-5 w-5" />}
            label="Current Streak"
            value={`${streak} days`}
            accent="amber"
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            label="Today's Study"
            value={`${Math.floor(completedTodayMinutes / 60)}h ${completedTodayMinutes % 60}m`}
            sublabel={`of ${Math.floor(dailyTarget / 60)}h ${dailyTarget % 60}m`}
            accent="emerald"
          />
          <StatCard
            icon={<Target className="h-5 w-5" />}
            label="Biggest Gap"
            value={
              path.skillScores.length > 0 && path.skillScores.every((s) => s.score >= 100)
                ? "None"
                : path.weakestSkill
            }
            accent={
              path.skillScores.length > 0 && path.skillScores.every((s) => s.score >= 100)
                ? "emerald"
                : "rose"
            }
          />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Today's Learning */}
          <div className="lg:col-span-2 animate-fade-in-up delay-200">
            <Card className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Today's Learning</h3>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {completedToday}/{todayLearning.length} done
                </span>
              </div>

              {/* Today's progress bar */}
              <div className="mb-4">
                <ProgressBar
                  value={completedTodayMinutes}
                  max={dailyTarget}
                  color="bg-emerald-500"
                  showValue
                />
              </div>

              <div className="space-y-2">
                {todayLearning.length === 0 && (
                  <p className="py-6 text-center text-sm text-slate-400">
                    No learning items for today. Complete your current stage to get new items!
                  </p>
                )}
                {todayLearning.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
                      item.completed
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-slate-300" />
                    )}
                    <span
                      className={`flex-1 text-sm font-medium ${
                        item.completed ? "text-slate-400 line-through" : "text-slate-700"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {item.duration} min
                    </span>
                  </div>
                ))}
              </div>

              {allTodayDone && currentStage && (
                <div className="mt-4 rounded-xl bg-blue-50 p-4 text-center">
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    All today's tasks done! Mark "{currentStage.title}" as complete?
                  </p>
                  <Button onClick={handleFinishStage} className="w-full sm:w-auto">
                    <CheckCircle2 className="h-4 w-4" />
                    Complete This Stage
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Right column: Skill Gaps + Path Preview */}
          <div className="space-y-6 animate-fade-in-up delay-300">
            {/* Skill gaps */}
            <Card className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-rose-600" />
                  <h3 className="text-lg font-bold text-slate-900">Your Skill Gaps</h3>
                </div>
                <button
                  onClick={() => onNavigate("skill-gap")}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {path.skillScores.map((skill, idx) => (
                  <SkillBar
                    key={skill.skill}
                    skill={skill}
                    isWeakest={skill.skill === path.weakestSkill}
                    delay={idx * 80}
                  />
                ))}
              </div>
            </Card>

            {/* Path preview */}
            <Card className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Learning Path</h3>
                </div>
                <button
                  onClick={() => onNavigate("roadmap")}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  View Full Path
                </button>
              </div>

              {currentStage && (
                <div className="mb-3 rounded-xl border-2 border-blue-200 bg-blue-50 p-3">
                  <p className="text-xs font-medium text-blue-700">Current Stage</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900">{currentStage.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{currentStage.description}</p>
                </div>
              )}

              {nextStage && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">Up Next</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-700">{nextStage.title}</p>
                </div>
              )}

              {!currentStage && !nextStage && (
                <p className="py-4 text-center text-sm text-slate-400">
                  Roadmap complete! You're ready.
                </p>
              )}

              <button
                onClick={() => onNavigate("roadmap")}
                className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Full Path
                <ArrowRight className="h-4 w-4" />
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
