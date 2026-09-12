import { useState, useEffect } from "react";
import { SkillScore } from "@/types";
import Button from "@/components/Button";
import Card from "@/components/Card";
import StepIndicator from "@/components/StepIndicator";
import SkillBar from "@/components/SkillBar";
import { ArrowRight, Target, TrendingDown } from "lucide-react";

interface SkillGapAnalysisProps {
  skillScores: SkillScore[];
  weakestSkill: string;
  onContinue: () => void;
  onBack: () => void;
}

export default function SkillGapAnalysis({
  skillScores,
  weakestSkill,
  onContinue,
  onBack,
}: SkillGapAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    onContinue();
  };

  if (isAnalyzing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center">
          <div className="relative mx-auto mb-6 h-16 w-16">
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-200 opacity-75" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Target className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Analyzing your skills...</h2>
          <p className="mt-2 text-sm text-slate-500">
            Comparing your answers against skill benchmarks
          </p>
          <div className="mx-auto mt-6 flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const avgScore = skillScores.length > 0
    ? Math.round(skillScores.reduce((sum, s) => sum + s.score, 0) / skillScores.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8">
          <StepIndicator steps={["Profile", "Assessment", "Analysis", "Roadmap"]} current={2} />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Your Skill Gap Analysis
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Based on your assessment, here's where you stand.
          </p>
        </div>

        {/* Weakest skill highlight */}
        <Card className="mb-6 overflow-hidden border-rose-200 bg-gradient-to-br from-rose-50 to-white p-6 sm:p-8 animate-fade-in-up">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100">
              <TrendingDown className="h-6 w-6 text-rose-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-rose-700">Your Biggest Gap</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                {weakestSkill}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Strengthening this skill first will improve your progress toward your target role.
                We'll prioritize it in your learning path.
              </p>
            </div>
          </div>
        </Card>

        {/* Skill scores */}
        <Card className="mb-6 p-6 sm:p-8 animate-fade-in-up delay-200">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Skill Scores</h3>
            <div className="text-right">
              <p className="text-xs text-slate-500">Average</p>
              <p className="text-lg font-bold text-blue-600">{avgScore}%</p>
            </div>
          </div>
          <div className="space-y-3">
            {skillScores.map((skill, idx) => (
              <SkillBar
                key={skill.skill}
                skill={skill}
                isWeakest={skill.skill === weakestSkill}
                delay={idx * 100}
              />
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 animate-fade-in-up delay-300">
          <Button variant="ghost" onClick={onBack}>
            Retake Assessment
          </Button>
          <Button onClick={handleContinue} className="px-6">
            Generate My Learning Path
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
