import { CareerGoal, SkillLevel, DailyStudyTime } from "@/types";

export const CAREER_OPTIONS: { value: CareerGoal; icon: string }[] = [
  { value: "Web Developer", icon: "Globe" },
  { value: "Data Analyst", icon: "BarChart3" },
  { value: "AI/ML Engineer", icon: "BrainCircuit" },
  { value: "Software Developer", icon: "Code2" },
  { value: "UI/UX Designer", icon: "PenTool" },
];

export const LEVEL_OPTIONS: SkillLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const STUDY_TIME_OPTIONS: DailyStudyTime[] = [
  "30 min",
  "1 hour",
  "2 hours",
  "3+ hours",
];

export const TOPICS_BY_CAREER: Record<string, string[]> = {
  "Web Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git & GitHub",
    "APIs",
  ],
  "Data Analyst": [
    "Excel",
    "SQL",
    "Python",
    "Statistics",
    "Data Visualization",
    "Pandas",
  ],
  "AI/ML Engineer": [
    "Python",
    "Math & Statistics",
    "NumPy & Pandas",
    "Machine Learning",
    "Deep Learning",
    "NLP & Computer Vision",
    "ML Deployment",
  ],
  "Software Developer": [
    "Java",
    "Data Structures",
    "Algorithms",
    "OOP",
    "Databases",
    "System Design",
  ],
  "UI/UX Designer": [
    "Figma",
    "Wireframing",
    "Typography",
    "Color Theory",
    "Prototyping",
    "User Research",
  ],
};

export const DEFAULT_TOPICS = TOPICS_BY_CAREER["Web Developer"];
