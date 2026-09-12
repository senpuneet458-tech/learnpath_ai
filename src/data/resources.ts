import { LearningResource } from "@/types";

export const LEARNING_RESOURCES: Record<string, LearningResource[]> = {
  "Web Developer": [
    {
      id: "web-res-html",
      title: "HTML Full Course for Beginners",
      topic: "HTML",
      category: "HTML",
      url: "https://www.youtube.com/watch?v=kUMe1FHqCGE",
      description: "A complete HTML course covering tags, forms, semantics, and accessibility from scratch.",
    },
    {
      id: "web-res-css",
      title: "CSS Crash Course for Beginners",
      topic: "CSS",
      category: "CSS",
      url: "https://www.youtube.com/watch?v=ieThC78gi1Q",
      description: "Learn CSS selectors, Flexbox, Grid, responsive design, and modern layout techniques.",
    },
    {
      id: "web-res-js",
      title: "JavaScript Course for Beginners",
      topic: "JavaScript",
      category: "JavaScript",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      description: "Full JavaScript tutorial covering variables, functions, DOM manipulation, and async patterns.",
    },
    {
      id: "web-res-react",
      title: "React Course for Beginners",
      topic: "React",
      category: "React",
      url: "https://www.youtube.com/watch?v=bMknfKXIFI8",
      description: "Learn React from scratch — components, props, state, hooks, and building real apps.",
    },
  ],

  "AI/ML Engineer": [
    {
      id: "ml-res-python",
      title: "Python for Beginners — Full Course",
      topic: "Python",
      category: "Python",
      url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      description: "A comprehensive Python course from freeCodeCamp covering syntax, data structures, and OOP.",
    },
    {
      id: "ml-res-dl",
      title: "But what is a neural network? | Deep learning chapter 1",
      topic: "Deep Learning",
      category: "Deep Learning",
      url: "https://www.youtube.com/watch?v=aircAruvnKk",
      description: "3Blue1Brown's visual introduction to neural networks — intuitive and beautifully illustrated.",
    },
    {
      id: "ml-res-ml",
      title: "Random Forests Part 1 — Building, Using and Evaluating",
      topic: "Machine Learning",
      category: "Machine Learning",
      url: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ",
      description: "StatQuest explains random forests step by step with clear, approachable visual examples.",
    },
    {
      id: "ml-res-stats",
      title: "StatQuest Machine Learning & Statistics Video Library",
      topic: "Math & Statistics",
      category: "Statistics",
      url: "https://statquest.org/video-index/",
      description: "A curated library of StatQuest videos covering statistics, probability, and machine learning concepts.",
    },
  ],

  "Data Analyst": [
    {
      id: "da-res-sql",
      title: "SQL Full Course for Beginners",
      topic: "SQL",
      category: "SQL",
      url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
      description: "Learn SQL from basics to advanced — SELECT, JOIN, GROUP BY, subqueries, and more.",
    },
    {
      id: "da-res-python",
      title: "Python for Data Analysis",
      topic: "Python",
      category: "Python",
      url: "https://www.youtube.com/watch?v=ua-CiDNNj30",
      description: "A practical guide to using Python for data analysis with Pandas and NumPy.",
    },
    {
      id: "da-res-viz",
      title: "Data Visualization with Python",
      topic: "Data Visualization",
      category: "Data Visualization",
      url: "https://www.youtube.com/watch?v=0P7QnIQDBbs",
      description: "Create compelling charts and graphs using Matplotlib, Seaborn, and Plotly.",
    },
  ],

  "Software Developer": [
    {
      id: "sd-res-java",
      title: "Java Full Course for Beginners",
      topic: "Java",
      category: "Java",
      url: "https://www.youtube.com/watch?v=GrSV6YjJy0A",
      description: "Comprehensive Java tutorial covering syntax, OOP, collections, and exception handling.",
    },
    {
      id: "sd-res-ds",
      title: "Data Structures and Algorithms Course",
      topic: "Data Structures",
      category: "Data Structures",
      url: "https://www.youtube.com/watch?v=8hly31xKli0",
      description: "A full DSA course covering arrays, linked lists, trees, graphs, sorting, and searching.",
    },
    {
      id: "sd-res-sysdesign",
      title: "System Design Course for Beginners",
      topic: "System Design",
      category: "System Design",
      url: "https://www.youtube.com/watch?v=i53Gi_Y3Qcj",
      description: "Learn system design fundamentals — scalability, load balancing, caching, and API design.",
    },
  ],

  "UI/UX Designer": [
    {
      id: "ux-res-figma",
      title: "Figma Full Course for Beginners",
      topic: "Figma",
      category: "Figma",
      url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
      description: "Learn Figma from scratch — tools, frames, components, auto-layout, and prototyping.",
    },
    {
      id: "ux-res-typo",
      title: "Typography for Designers",
      topic: "Typography",
      category: "Typography",
      url: "https://www.youtube.com/watch?v=QrNHuJxXZh0",
      description: "Understand font pairing, hierarchy, spacing, and readable type systems for UI design.",
    },
    {
      id: "ux-res-research",
      title: "UX Research Methods",
      topic: "User Research",
      category: "User Research",
      url: "https://www.youtube.com/watch?v=OuyzKkSSOKs",
      description: "Learn user research techniques — interviews, surveys, usability testing, and personas.",
    },
  ],
};

const DEFAULT_RESOURCES: LearningResource[] = LEARNING_RESOURCES["Web Developer"];

export function getLearningResources(goal: string): LearningResource[] {
  return LEARNING_RESOURCES[goal] ?? DEFAULT_RESOURCES;
}
