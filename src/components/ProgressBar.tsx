interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  showValue?: boolean;
  delay?: number;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  color = "bg-blue-600",
  showValue = false,
  delay = 0,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-slate-700">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-slate-900">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color} animate-grow-width transition-all duration-500 ease-out`}
          style={{ width: `${pct}%`, animationDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}
