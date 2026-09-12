import { useState, useEffect } from "react";
import { UserProfile, AssessmentAnswer, LearningPathResult, TodayLearningItem, AppView } from "@/types";
import { generateLearningPath } from "@/utils/learningPath";
import {
  saveProfile,
  loadProfile,
  saveAnswers,
  loadAnswers,
  savePath,
  loadPath,
  saveTodayLearning,
  loadTodayLearning,
  saveStreak,
  loadStreak,
  clearAssessment,
} from "@/utils/storage";

import Navbar from "@/components/Navbar";
import Landing from "@/pages/Landing";
import ProfileSetup from "@/pages/ProfileSetup";
import Assessment from "@/pages/Assessment";
import SkillGapAnalysis from "@/pages/SkillGapAnalysis";
import RoadmapView from "@/pages/RoadmapView";
import Dashboard from "@/pages/Dashboard";
import EditProfile from "@/pages/EditProfile";

export default function App() {
  const [view, setView] = useState<AppView>("landing");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [path, setPath] = useState<LearningPathResult | null>(null);
  const [todayLearning, setTodayLearning] = useState<TodayLearningItem[]>([]);
  const [streak, setStreak] = useState(7);
  const [navView, setNavView] = useState<AppView>("dashboard");

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = loadProfile();
    const savedAnswers = loadAnswers();
    const savedPath = loadPath();
    const savedToday = loadTodayLearning();
    const savedStreak = loadStreak();

    if (savedProfile) setProfile(savedProfile);
    if (savedAnswers) setAnswers(savedAnswers);
    if (savedPath) setPath(savedPath);
    if (savedToday) setTodayLearning(savedToday);
    setStreak(savedStreak);

    // If we have a full session, go to dashboard. Otherwise landing.
    if (savedProfile && savedPath) {
      setView("dashboard");
      setNavView("dashboard");
    }
  }, []);

  const handleProfileSubmit = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
    setView("assessment");
  };

  const handleAssessmentComplete = (newAnswers: AssessmentAnswer[]) => {
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    // Generate learning path
    const currentProfile = profile ?? {
      name: "Alex",
      goal: "Web Developer",
      level: "Beginner" as const,
      dailyStudyTime: "2 hours" as const,
      topics: ["HTML", "CSS", "JavaScript", "React", "Git & GitHub"],
    };
    const result = generateLearningPath(currentProfile, newAnswers);
    setPath(result);
    savePath(result);

    // Initialize today's learning
    if (result.todayLearning.length > 0) {
      setTodayLearning(result.todayLearning);
      saveTodayLearning(result.todayLearning);
    }

    setView("skill-gap");
  };

  const handleSkillGapContinue = () => {
    setView("roadmap");
  };

  const handleRoadmapContinue = () => {
    setView("dashboard");
    setNavView("dashboard");
  };

  const handleUpdateTodayLearning = (items: TodayLearningItem[]) => {
    setTodayLearning(items);
    saveTodayLearning(items);
  };

  const handleUpdatePath = (updatedPath: LearningPathResult) => {
    setPath(updatedPath);
    savePath(updatedPath);

    // If current stage changed, regenerate today's learning
    const newInProgress = updatedPath.roadmap.find((m) => m.status === "in-progress");
    if (newInProgress && profile) {
      const newPath = generateLearningPath(profile, answers);
      // Keep the updated roadmap statuses from updatedPath, but use new today's learning
      const combinedPath: LearningPathResult = {
        ...updatedPath,
        todayLearning: newPath.todayLearning,
      };
      setPath(combinedPath);
      savePath(combinedPath);
      setTodayLearning(newPath.todayLearning);
      saveTodayLearning(newPath.todayLearning);
    }
  };

  const handleNavigate = (target: AppView) => {
    // Guard: can only go to dashboard/roadmap/skill-gap/edit-profile if profile exists
    if (!profile && target !== "landing" && target !== "profile") {
      setView("landing");
      return;
    }
    if (!path && (target === "dashboard" || target === "roadmap" || target === "skill-gap")) {
      setView("profile");
      return;
    }
    setView(target);
    if (target === "dashboard" || target === "roadmap" || target === "skill-gap" || target === "edit-profile") {
      setNavView(target);
    }
  };

  const handleEditProfileSave = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile);

    // Regenerate path if we have answers
    if (answers.length > 0) {
      const result = generateLearningPath(updatedProfile, answers);
      setPath(result);
      savePath(result);
      setTodayLearning(result.todayLearning);
      saveTodayLearning(result.todayLearning);
    }

    setView("dashboard");
    setNavView("dashboard");
  };

  const handleRestartAssessment = () => {
    clearAssessment();
    setAnswers([]);
    setPath(null);
    setTodayLearning([]);
    setView("assessment");
  };

  const handleBackToLanding = () => {
    setView("landing");
  };

  // Show navbar only on post-onboarding views
  const showNavbar =
    view === "dashboard" || view === "roadmap" || view === "skill-gap" || view === "edit-profile";

  // Guard: if we reach dashboard/roadmap/skill-gap without data, redirect
  if (!showNavbar && view !== "landing" && view !== "profile" && view !== "assessment") {
    setView("landing");
    return null;
  }

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar onNavigate={handleNavigate} active={navView} />}

      {view === "landing" && <Landing onGetStarted={() => setView("profile")} />}

      {view === "profile" && (
        <ProfileSetup
          initialProfile={profile}
          onSubmit={handleProfileSubmit}
          onBack={handleBackToLanding}
        />
      )}

      {view === "assessment" && (
        <Assessment onComplete={handleAssessmentComplete} onBack={() => setView("profile")} />
      )}

      {view === "skill-gap" && path && (
        <SkillGapAnalysis
          skillScores={path.skillScores}
          weakestSkill={path.weakestSkill}
          onContinue={handleSkillGapContinue}
          onBack={() => setView("assessment")}
        />
      )}

      {view === "roadmap" && path && profile && (
        <RoadmapView
          path={path}
          profile={profile}
          onContinue={handleRoadmapContinue}
          onBack={() => setView("skill-gap")}
        />
      )}

      {view === "dashboard" && path && profile && (
        <Dashboard
          profile={profile}
          path={path}
          todayLearning={todayLearning}
          streak={streak}
          onUpdateTodayLearning={handleUpdateTodayLearning}
          onUpdatePath={handleUpdatePath}
          onNavigate={handleNavigate}
        />
      )}

      {view === "edit-profile" && profile && (
        <EditProfile
          profile={profile}
          onSave={handleEditProfileSave}
          onBack={() => setView("dashboard")}
          onRestartAssessment={handleRestartAssessment}
        />
      )}
    </div>
  );
}
