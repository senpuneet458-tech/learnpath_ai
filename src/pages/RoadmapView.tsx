import { LearningPathResult, UserProfile } from "@/types";
import Button from "@/components/Button";
import Card from "@/components/Card";
import RoadmapItem from "@/components/RoadmapItem";
import ResourceCard from "@/components/ResourceCard";
import { getLearningResources } from "@/data/resources";
import { ArrowRight, Calendar, Clock, Target, BookOpen } from "lucide-react";

interface RoadmapViewProps {
  path: LearningPathResult;
  profile: UserProfile;
  onContinue: () => void;
  onBack: () => void;
}

export default function RoadmapView({ path, profile, onContinue, onBack }: RoadmapViewProps) {
  const completedCount = path.roadmap.filter((m) => m.status === "completed").length;
  const totalCount = path.roadmap.length;
  const totalHours = path.roadmap.reduce((sum, m) => sum + m.baseHours, 0);
  const inProgress = path.roadmap.find((m) => m.status === "in-progress");
  const resources = getLearningResources(profile.goal);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <Target className="h-4 w-4" />
            Personalized Roadmap
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Your Path to {profile.goal}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Adapted to your {profile.dailyStudyTime} daily study time.
            {path.skillScores.length > 0 && path.skillScores.every((s) => s.score >= 100)
              ? " You've mastered the fundamentals — your path focuses on advanced topics."
              : <> We've prioritized your weakest skill: <span className="font-semibold text-rose-600">{path.weakestSkill}</span>.</>
            }
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4 animate-fade-in-up delay-100">
          <Card className="p-4 text-center">
            <div className="mb-1 flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">{completedCount}/{totalCount}</p>
            <p className="text-xs text-slate-500">Stages Done</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="mb-1 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">~{totalHours}h</p>
            <p className="text-xs text-slate-500">Total Time</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="mb-1 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              {Math.ceil(totalHours / (profile.dailyStudyTime === "30 min" ? 0.5 : profile.dailyStudyTime === "1 hour" ? 1 : profile.dailyStudyTime === "2 hours" ? 2 : 3))}
            </p>
            <p className="text-xs text-slate-500">Est. Days</p>
          </Card>
        </div>

        {/* Current focus banner */}
        {inProgress && (
          <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-white p-4 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-700">Current Focus</p>
                  <p className="text-sm font-bold text-slate-900">{inProgress.title}</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Timeline roadmap */}
        <div className="mb-10">
          {path.roadmap.map((module, idx) => (
            <RoadmapItem
              key={module.id}
              module={module}
              isLast={idx === path.roadmap.length - 1}
            />
          ))}
        </div>

        {/* Learning Resources */}
        <div className="mb-8 animate-fade-in-up delay-300">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Learning Resources</h2>
            <span className="text-sm text-slate-400">— curated for {profile.goal}</span>
          </div>
          <p className="mb-5 text-sm text-slate-600">
            Hand-picked videos to help you master each topic in your roadmap.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 animate-fade-in-up delay-300">
          <Button variant="ghost" onClick={onBack}>
            Back to Analysis
          </Button>
          <Button onClick={onContinue} className="px-6">
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
