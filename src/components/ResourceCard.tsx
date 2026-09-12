import { LearningResource } from "@/types";
import { Youtube, ExternalLink, BookOpen } from "lucide-react";

interface ResourceCardProps {
  resource: LearningResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const isYouTube = resource.url.includes("youtube.com") || resource.url.includes("statquest.org");
  const isStatQuest = resource.url.includes("statquest.org");

  return (
    <div className="card card-hover flex flex-col p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isYouTube ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
            }`}
          >
            {isStatQuest ? (
              <BookOpen className="h-5 w-5" />
            ) : isYouTube ? (
              <Youtube className="h-5 w-5" />
            ) : (
              <BookOpen className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0">
            <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {resource.category}
            </span>
          </div>
        </div>
      </div>

      <h4 className="mb-1.5 text-sm font-bold leading-snug text-slate-900">
        {resource.title}
      </h4>
      <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-600">
        {resource.description}
      </p>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98]"
      >
        {isYouTube ? <Youtube className="h-4 w-4 text-rose-500" /> : <ExternalLink className="h-4 w-4" />}
        Watch Resource
      </a>
    </div>
  );
}
