import { useState } from "react";
import { AssessmentQuestion, AssessmentAnswer } from "@/types";
import { getCareerPath } from "@/data/careerPaths";
import Button from "@/components/Button";
import Card from "@/components/Card";
import StepIndicator from "@/components/StepIndicator";
import AssessmentQuestionView from "@/components/AssessmentQuestionView";
import { ArrowRight, ArrowLeft, Brain } from "lucide-react";

interface AssessmentProps {
  goal: string;
  onComplete: (answers: AssessmentAnswer[]) => void;
  onBack: () => void;
}

export default function Assessment({ goal, onComplete, onBack }: AssessmentProps) {
  const careerPath = getCareerPath(goal);
  const questions = careerPath.assessmentQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question: AssessmentQuestion = questions[currentIndex];
  const total = questions.length;
  const selectedOptionId = answers[question.id] ?? null;
  const progress = ((currentIndex + 1) / total) * 100;

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Build answer results
      const results: AssessmentAnswer[] = questions.map((q) => ({
        questionId: q.id,
        selectedOptionId: answers[q.id] ?? "",
        correct: answers[q.id] === q.correctOptionId,
      }));
      onComplete(results);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onBack();
    }
  };

  const isLastQuestion = currentIndex === total - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8">
          <StepIndicator steps={["Profile", "Assessment", "Analysis", "Roadmap"]} current={1} />
        </div>

        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <Brain className="h-4 w-4" />
            Skill Assessment
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Let's Check Your Skills
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Answer {total} {goal} questions so we can identify your learning gaps.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="p-6 sm:p-8">
          <AssessmentQuestionView
            question={question}
            questionNumber={currentIndex + 1}
            totalQuestions={total}
            selectedOptionId={selectedOptionId}
            onSelect={handleSelect}
          />

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <Button variant="ghost" onClick={handlePrev}>
              <ArrowLeft className="h-4 w-4" />
              {currentIndex === 0 ? "Back to Profile" : "Previous"}
            </Button>
            <Button onClick={handleNext} disabled={!selectedOptionId} className="px-6">
              {isLastQuestion ? "Analyze My Skill Gaps" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
