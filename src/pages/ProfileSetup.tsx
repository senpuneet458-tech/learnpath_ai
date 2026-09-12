import { useState } from "react";
import { UserProfile, SkillLevel, DailyStudyTime, CareerGoal } from "@/types";
import { CAREER_OPTIONS, LEVEL_OPTIONS, STUDY_TIME_OPTIONS, TOPICS_BY_CAREER } from "@/data/careers";
import Button from "@/components/Button";
import Card from "@/components/Card";
import TopicChip from "@/components/TopicChip";
import StepIndicator from "@/components/StepIndicator";
import { ArrowRight, ArrowLeft, User, Check } from "lucide-react";

interface ProfileSetupProps {
  initialProfile: UserProfile | null;
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

export default function ProfileSetup({ initialProfile, onSubmit, onBack }: ProfileSetupProps) {
  const [name, setName] = useState(initialProfile?.name ?? "Alex");
  const [goal, setGoal] = useState<CareerGoal>(initialProfile?.goal ?? "Web Developer");
  const [customGoal, setCustomGoal] = useState(
    initialProfile && !CAREER_OPTIONS.some((c) => c.value === initialProfile.goal)
      ? initialProfile.goal
      : ""
  );
  const [useCustom, setUseCustom] = useState(false);
  const [level, setLevel] = useState<SkillLevel>(initialProfile?.level ?? "Beginner");
  const [dailyTime, setDailyTime] = useState<DailyStudyTime>(initialProfile?.dailyStudyTime ?? "2 hours");
  const [topics, setTopics] = useState<string[]>(initialProfile?.topics ?? TOPICS_BY_CAREER["Web Developer"]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableTopics = TOPICS_BY_CAREER[goal] ?? TOPICS_BY_CAREER["Web Developer"];

  const handleGoalSelect = (selectedGoal: CareerGoal) => {
    setGoal(selectedGoal);
    setUseCustom(false);
    // Reset topics to default for that career
    setTopics(TOPICS_BY_CAREER[selectedGoal] ?? []);
  };

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const effectiveGoal = useCustom ? customGoal.trim() : goal;
    if (!name.trim()) errs.name = "Please enter your name";
    if (!effectiveGoal) errs.goal = "Please select or enter a career goal";
    if (topics.length === 0) errs.topics = "Select at least one topic";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const profile: UserProfile = {
      name: name.trim(),
      goal: useCustom ? customGoal.trim() : goal,
      level,
      dailyStudyTime: dailyTime,
      topics,
    };
    onSubmit(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8">
          <StepIndicator steps={["Profile", "Assessment", "Analysis", "Roadmap"]} current={0} />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Build Your Learning Profile
        </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Tell us about your goals so we can personalize your learning path.
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          {/* Name */}
          <div className="mb-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <User className="h-4 w-4 text-slate-400" />
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input-field"
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>

          {/* Goal */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              What do you want to become?
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CAREER_OPTIONS.map((option) => {
                const isSelected = !useCustom && goal === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleGoalSelect(option.value)}
                    className={`relative rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-500/10"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected && (
                      <Check className="absolute right-2 top-2 h-4 w-4 text-blue-600" />
                    )}
                    <span className="text-sm font-medium text-slate-800">{option.value}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom goal */}
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setUseCustom(true)}
                className={`text-sm font-medium transition-colors ${
                  useCustom ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
                }`}
              >
                + Enter a custom goal
              </button>
              {useCustom && (
                <input
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="e.g. Game Developer, DevOps Engineer..."
                  className="input-field mt-2"
                  autoFocus
                />
              )}
            </div>
            {errors.goal && <p className="mt-1 text-xs text-rose-600">{errors.goal}</p>}
          </div>

          {/* Level */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Current Skill Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {LEVEL_OPTIONS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`rounded-xl border-2 py-3 text-sm font-medium transition-all duration-200 ${
                    level === lvl
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Study time */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Daily Study Time
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STUDY_TIME_OPTIONS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setDailyTime(time)}
                  className={`rounded-xl border-2 py-3 text-sm font-medium transition-all duration-200 ${
                    dailyTime === time
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Topics of Interest
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTopics.map((topic) => (
                <TopicChip
                  key={topic}
                  label={topic}
                  selected={topics.includes(topic)}
                  onClick={() => toggleTopic(topic)}
                />
              ))}
            </div>
            {errors.topics && <p className="mt-2 text-xs text-rose-600">{errors.topics}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleSubmit} className="px-6">
              Analyze My Skills
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
