import { AssessmentQuestion } from "@/types";

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q-html",
    skill: "HTML",
    question: "What does HTML primarily define?",
    options: [
      { id: "a", label: "Database queries", weight: 0 },
      { id: "b", label: "Page structure", weight: 100 },
      { id: "c", label: "Server deployment", weight: 0 },
      { id: "d", label: "Image compression", weight: 0 },
    ],
    correctOptionId: "b",
  },
  {
    id: "q-css",
    skill: "CSS",
    question: "Which CSS property controls the spacing between elements?",
    options: [
      { id: "a", label: "color", weight: 0 },
      { id: "b", label: "font-size", weight: 0 },
      { id: "c", label: "margin", weight: 100 },
      { id: "d", label: "display", weight: 40 },
    ],
    correctOptionId: "c",
  },
  {
    id: "q-js",
    skill: "JavaScript",
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: [
      { id: "a", label: "var", weight: 40 },
      { id: "b", label: "let", weight: 100 },
      { id: "c", label: "function", weight: 0 },
      { id: "d", label: "return", weight: 0 },
    ],
    correctOptionId: "b",
  },
  {
    id: "q-react",
    skill: "React",
    question: "What is a React component primarily used for?",
    options: [
      { id: "a", label: "Styling CSS files", weight: 20 },
      { id: "b", label: "Database management", weight: 0 },
      { id: "c", label: "Building reusable UI pieces", weight: 100 },
      { id: "d", label: "Compiling TypeScript", weight: 0 },
    ],
    correctOptionId: "c",
  },
  {
    id: "q-git",
    skill: "Git & APIs",
    question: "Which Git command saves your changes to the local repository?",
    options: [
      { id: "a", label: "git push", weight: 60 },
      { id: "b", label: "git commit", weight: 100 },
      { id: "c", label: "git clone", weight: 0 },
      { id: "d", label: "git fetch", weight: 20 },
    ],
    correctOptionId: "b",
  },
];
