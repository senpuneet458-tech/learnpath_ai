import { UserProfile, AssessmentAnswer, LearningPathResult } from "@/types";

const PROFILE_KEY = "learnpath_profile";
const ANSWERS_KEY = "learnpath_answers";
const PATH_KEY = "learnpath_path";
const TODAY_KEY = "learnpath_today";
const STREAK_KEY = "learnpath_streak";

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    /* ignore */
  }
}

export function loadProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function saveAnswers(answers: AssessmentAnswer[]): void {
  try {
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  } catch {
    /* ignore */
  }
}

export function loadAnswers(): AssessmentAnswer[] | null {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AssessmentAnswer[];
  } catch {
    return null;
  }
}

export function savePath(path: LearningPathResult): void {
  try {
    localStorage.setItem(PATH_KEY, JSON.stringify(path));
  } catch {
    /* ignore */
  }
}

export function loadPath(): LearningPathResult | null {
  try {
    const raw = localStorage.getItem(PATH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LearningPathResult;
  } catch {
    return null;
  }
}

export function saveTodayLearning(
  items: { id: string; title: string; duration: number; completed: boolean }[]
): void {
  try {
    localStorage.setItem(TODAY_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function loadTodayLearning(): {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
}[] | null {
  try {
    const raw = localStorage.getItem(TODAY_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveStreak(streak: number): void {
  try {
    localStorage.setItem(STREAK_KEY, String(streak));
  } catch {
    /* ignore */
  }
}

export function loadStreak(): number {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return 7;
    const n = parseInt(raw, 10);
    return isNaN(n) ? 7 : n;
  } catch {
    return 7;
  }
}

export function clearAssessment(): void {
  try {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(PATH_KEY);
    localStorage.removeItem(TODAY_KEY);
  } catch {
    /* ignore */
  }
}

export function clearAll(): void {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(PATH_KEY);
    localStorage.removeItem(TODAY_KEY);
    localStorage.removeItem(STREAK_KEY);
  } catch {
    /* ignore */
  }
}
