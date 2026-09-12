import { useState } from "react";
import { UserProfile, SkillLevel, DailyStudyTime, CareerGoal } from "@/types";
import { CAREER_OPTIONS, LEVEL_OPTIONS, STUDY_TIME_OPTIONS, TOPICS_BY_CAREER } from "@/data/careers";
import Button from "@/components/Button";
import Card from "@/components/Card";
import TopicChip from "@/components/TopicChip";
import { ArrowLeft, RotateCcw, Save, User } from "lucide-react";

interface EditProfileProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onBack: () => void;
  onRestartAssessment: () => void;
}

export default function EditProfile({
  profile,
  onSave,
  onBack,
  onRestartAssessment,
}: EditProfileProps) {
  const [name, setName] = useState(profile.name);
  const [goal, setGoal] = useState<CareerGoal>(
    CAREER_OPTIONS.some((c) => c.value === profile.goal) ? profile.goal : "Web Developer"
  );
  const [customGoal, setCustomGoal] = useState(
    CAREER_OPTIONS.some((c) => c.value === profile.goal) ? "" : profile.goal
  );
  const [useCustom, setUseCustom] = useState(
    !CAREER_OPTIONS.some((c) => c.value === profile.goal)
  );
  const [level, setLevel] = useState<SkillLevel>(profile.level);
  const [dailyTime, setDailyTime] = useState<DailyStudyTime>(profile.dailyStudyTime);
  const [topics, setTopics] = useState<string[]>(profile.topics);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableTopics = TOPICS_BY_CAREER[goal] ?? TOPICS_BY_CAREER["Web Developer"];

  const handleGoalSelect = (selectedGoal: CareerGoal) => {
    setGoal(selectedGoal);
    setUseCustom(false);
    setTopics(TOPICS_BY_CAREER[selectedGoal] ?? []);
  };

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSave = () => {
    const errs: Record<string, string> = {};
    const effectiveGoal = useCustom ? customGoal.trim() : goal;
    if (!name.trim()) errs.name = "Please enter your name";
    if (!effectiveGoal) errs.goal = "Please select or enter a career goal";
    if (topics.length === 0) errs.topics = "Select at least one topic";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onSave({
      name: name.trim(),
      goal: useCustom ? customGoal.trim() : goal,
      level,
      dailyStudyTime: dailyTime,
      topics,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm transition-colors hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Profile Settings
            </h1>
            <p className="text-sm text-slate-500">Update your learning preferences.</p>
          </div>
        </div>

        <Card className="mb-6 p-6 sm:p-8">
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
              className="input-field"
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>

          {/* Goal */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Career Goal
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CAREER_OPTIONS.map((option) => {
                const isSelected = !useCustom && goal === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleGoalSelect(option.value)}
                    className={`rounded-xl border-2 p-3 text-left text-sm font-medium transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    {option.value}
                  </button>
                );
              })}
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setUseCustom(true)}
                className={`text-sm font-medium ${
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
                  placeholder="Custom goal..."
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
              Skill Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {LEVEL_OPTIONS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`rounded-xl border-2 py-3 text-sm font-medium transition-all ${
                    level === lvl
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
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
                  className={`rounded-xl border-2 py-3 text-sm font-medium transition-all ${
                    dailyTime === time
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
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

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <Button variant="ghost" onClick={onRestartAssessment}>
              <RotateCcw className="h-4 w-4" />
              Restart Assessment
            </Button>
            <Button onClick={handleSave} className="px-6">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
