import { AssessmentQuestion } from "@/types";

interface AssessmentQuestionViewProps {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

export default function AssessmentQuestionView({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  onSelect,
}: AssessmentQuestionViewProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-sm text-slate-400">Skill: {question.skill}</span>
      </div>

      <h2 className="mb-6 text-xl font-bold text-slate-900 sm:text-2xl">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const letter = String.fromCharCode(65 + idx);
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {letter}
              </div>
              <span
                className={`text-sm font-medium sm:text-base ${
                  isSelected ? "text-slate-900" : "text-slate-700"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
