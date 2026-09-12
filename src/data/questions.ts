import { AssessmentQuestion } from "@/types";

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q-html",
    skill: "HTML",
    question: "What does HTML primarily define?",
    options: [
      { id: "a", label: "Database queries" },
      { id: "b", label: "Page structure" },
      { id: "c", label: "Server deployment" },
      { id: "d", label: "Image compression" },
    ],
    correctOptionId: "b",
  },
  {
    id: "q-css",
    skill: "CSS",
    question: "Which CSS property controls the spacing between elements?",
    options: [
      { id: "a", label: "color" },
      { id: "b", label: "font-size" },
      { id: "c", label: "margin" },
      { id: "d", label: "display" },
    ],
    correctOptionId: "c",
  },
  {
    id: "q-js",
    skill: "JavaScript",
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: [
      { id: "a", label: "var" },
      { id: "b", label: "let" },
      { id: "c", label: "function" },
      { id: "d", label: "return" },
    ],
    correctOptionId: "b",
  },
  {
    id: "q-react",
    skill: "React",
    question: "What is a React component primarily used for?",
    options: [
      { id: "a", label: "Styling CSS files" },
      { id: "b", label: "Database management" },
      { id: "c", label: "Building reusable UI pieces" },
      { id: "d", label: "Compiling TypeScript" },
    ],
    correctOptionId: "c",
  },
  {
    id: "q-git",
    skill: "Git & APIs",
    question: "Which Git command saves your changes to the local repository?",
    options: [
      { id: "a", label: "git push" },
      { id: "b", label: "git commit" },
      { id: "c", label: "git clone" },
      { id: "d", label: "git fetch" },
    ],
    correctOptionId: "b",
  },
];
