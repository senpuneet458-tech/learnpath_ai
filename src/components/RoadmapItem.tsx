import { RoadmapModule } from "@/types";
import { CheckCircle2, Circle, Lock, Clock, ChevronRight } from "lucide-react";
import Badge from "./Badge";

interface RoadmapItemProps {
  module: RoadmapModule;
  isLast: boolean;
}

export default function RoadmapItem({ module, isLast }: RoadmapItemProps) {
  const statusConfig = {
    completed: {
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-500" />,
      ring: "ring-emerald-200",
      bg: "bg-emerald-50",
      label: "Completed",
      badge: "success" as const,
    },
    "in-progress": {
      icon: <Circle className="h-6 w-6 text-blue-500 fill-blue-100" />,
      ring: "ring-blue-200",
      bg: "bg-blue-50",
      label: "In Progress",
      badge: "info" as const,
    },
    locked: {
      icon: <Lock className="h-6 w-6 text-slate-300" />,
      ring: "ring-slate-100",
      bg: "bg-white",
      label: "Upcoming",
      badge: "default" as const,
    },
  };

  const cfg = statusConfig[module.status];
  const isLocked = module.status === "locked";

  return (
    <div className="flex gap-3 sm:gap-5">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${cfg.bg} ring-2 ${cfg.ring}`}>
          {cfg.icon}
        </div>
        {!isLast && (
          <div
            className={`mt-1 w-0.5 flex-1 ${
              module.status === "completed" ? "bg-emerald-200" : "bg-slate-200"
            }`}
            style={{ minHeight: "2rem" }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={`card mb-4 flex-1 p-4 sm:p-5 ${
          isLocked ? "opacity-70" : ""
        } ${module.status === "in-progress" ? "ring-2 ring-blue-200" : ""}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Badge variant={cfg.badge}>{cfg.label}</Badge>
              <Badge variant="default">{module.difficulty}</Badge>
            </div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              {module.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{module.description}</p>
          </div>
          {!isLocked && (
            <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-300" />
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {module.baseHours}h estimated
          </span>
          <span className="text-slate-300">|</span>
          <div className="flex flex-wrap gap-1">
            {module.skills.map((s) => (
              <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
