import { GraduationCap } from "lucide-react";

interface NavbarProps {
  onNavigate: (view: "dashboard" | "roadmap" | "skill-gap" | "edit-profile" | "landing") => void;
  active: string;
  showNav?: boolean;
}

export default function Navbar({ onNavigate, active, showNav = true }: NavbarProps) {
  if (!showNav) return null;

  const links: { label: string; view: "dashboard" | "roadmap" | "skill-gap" | "edit-profile" }[] = [
    { label: "Dashboard", view: "dashboard" },
    { label: "My Path", view: "roadmap" },
    { label: "Skill Gaps", view: "skill-gap" },
    { label: "Profile", view: "edit-profile" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            LearnPath <span className="text-blue-600">AI</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <button
              key={link.view}
              onClick={() => onNavigate(link.view)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                active === link.view
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile nav - compact */}
        <nav className="flex items-center gap-1 md:hidden">
          {links.map((link) => (
            <button
              key={link.view}
              onClick={() => onNavigate(link.view)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                active === link.view
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
