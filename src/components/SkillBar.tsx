import { SkillScore } from "@/types";
import { AlertCircle } from "lucide-react";

interface SkillBarProps {
  skill: SkillScore;
  isWeakest?: boolean;
  delay?: number;
}

export default function SkillBar({ skill, isWeakest = false, delay = 0 }: SkillBarProps) {
  const color =
    skill.score >= 80
      ? "bg-emerald-500"
      : skill.score >= 60
      ? "bg-blue-500"
      : skill.score >= 40
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div
      className={`rounded-xl p-3 transition-all duration-200 ${
        isWeakest ? "bg-rose-50 ring-1 ring-rose-200" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">{skill.skill}</span>
          {isWeakest && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
              <AlertCircle className="h-3 w-3" />
              Biggest Gap
            </span>
          )}
        </div>
        <span className="text-sm font-bold text-slate-900">{skill.score}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color} animate-grow-width transition-all duration-700 ease-out`}
          style={{ width: `${skill.score}%`, animationDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}
