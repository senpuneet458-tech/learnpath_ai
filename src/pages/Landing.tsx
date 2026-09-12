import { GraduationCap, ArrowRight, Target, TrendingUp, Map, Sparkles } from "lucide-react";
import Button from "@/components/Button";

interface LandingProps {
  onGetStarted: () => void;
}

export default function Landing({ onGetStarted }: LandingProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              LearnPath <span className="text-blue-600">AI</span>
            </span>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Hackathon Demo
          </span>
        </header>

        {/* Hero */}
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            Personalized learning paths powered by skill-gap analysis
          </div>

          <h1 className="animate-fade-in-up delay-100 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Know your gaps.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Close them faster.
            </span>
          </h1>

          <p className="animate-fade-in-up delay-200 mt-6 max-w-xl text-base text-slate-600 sm:text-lg">
            LearnPath AI analyzes your current skills, identifies your biggest gaps,
            and builds a personalized roadmap to your dream career — all in under 90 seconds.
          </p>

          <div className="animate-fade-in-up delay-300 mt-8">
            <Button onClick={onGetStarted} className="px-8 py-3.5 text-base">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Feature cards */}
          <div className="animate-fade-in-up delay-500 mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: <Target className="h-6 w-6" />,
                title: "Skill Assessment",
                desc: "Quick 5-question test to measure where you stand today",
                color: "blue",
              },
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: "Gap Analysis",
                desc: "See your weakest skills and get a clear improvement plan",
                color: "emerald",
              },
              {
                icon: <Map className="h-6 w-6" />,
                title: "Personal Roadmap",
                desc: "A step-by-step learning path adapted to your study time",
                color: "amber",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="card card-hover p-5 text-left"
              >
                <div
                  className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${
                    feature.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : feature.color === "emerald"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
