interface TopicChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function TopicChip({ label, selected, onClick }: TopicChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
        selected
          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
      }`}
    >
      {label}
    </button>
  );
}
