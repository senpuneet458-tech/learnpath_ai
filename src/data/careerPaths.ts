import { CareerPath } from "@/types";

const o = (id: string, label: string, weight: number) => ({ id, label, weight });

export const CAREER_PATHS: Record<string, CareerPath> = {
  "Web Developer": {
    skills: ["HTML", "CSS", "JavaScript", "React", "Git & APIs"],
    assessmentQuestions: [
      {
        id: "web-q-html",
        skill: "HTML",
        question: "What does HTML primarily define?",
        options: [
          o("a", "Database queries", 0),
          o("b", "Page structure", 100),
          o("c", "Server deployment", 0),
          o("d", "Image compression", 0),
        ],
        correctOptionId: "b",
      },
      {
        id: "web-q-css",
        skill: "CSS",
        question: "Which CSS property controls the spacing between elements?",
        options: [
          o("a", "color", 0),
          o("b", "font-size", 0),
          o("c", "margin", 100),
          o("d", "display", 40),
        ],
        correctOptionId: "c",
      },
      {
        id: "web-q-js",
        skill: "JavaScript",
        question: "Which keyword declares a block-scoped variable in JavaScript?",
        options: [
          o("a", "var", 40),
          o("b", "let", 100),
          o("c", "function", 0),
          o("d", "return", 0),
        ],
        correctOptionId: "b",
      },
      {
        id: "web-q-react",
        skill: "React",
        question: "What is a React component primarily used for?",
        options: [
          o("a", "Styling CSS files", 20),
          o("b", "Database management", 0),
          o("c", "Building reusable UI pieces", 100),
          o("d", "Compiling TypeScript", 0),
        ],
        correctOptionId: "c",
      },
      {
        id: "web-q-git",
        skill: "Git & APIs",
        question: "Which Git command saves your changes to the local repository?",
        options: [
          o("a", "git push", 60),
          o("b", "git commit", 100),
          o("c", "git clone", 0),
          o("d", "git fetch", 20),
        ],
        correctOptionId: "b",
      },
    ],
    roadmap: [
      { id: "web-rm-html", title: "HTML Fundamentals", description: "Learn the structure of web pages with semantic HTML elements, forms, and accessibility basics.", skills: ["HTML"], difficulty: "Beginner", baseHours: 8, status: "completed" },
      { id: "web-rm-css", title: "CSS & Responsive Design", description: "Master styling, Flexbox, Grid, and responsive layouts that adapt to any screen size.", skills: ["CSS"], difficulty: "Beginner", baseHours: 12, status: "completed" },
      { id: "web-rm-js", title: "JavaScript Fundamentals", description: "Understand variables, functions, loops, objects, and the DOM to make pages interactive.", skills: ["JavaScript"], difficulty: "Intermediate", baseHours: 20, status: "in-progress" },
      { id: "web-rm-dom", title: "DOM & Browser APIs", description: "Manipulate the DOM, handle events, and use browser APIs like fetch and localStorage.", skills: ["JavaScript", "APIs"], difficulty: "Intermediate", baseHours: 10, status: "locked" },
      { id: "web-rm-git", title: "Git & GitHub", description: "Version control your projects, collaborate with branches, and push code to GitHub.", skills: ["Git & APIs"], difficulty: "Beginner", baseHours: 6, status: "locked" },
      { id: "web-rm-react", title: "React Fundamentals", description: "Build component-based UIs with props, state, hooks, and reusable patterns.", skills: ["React"], difficulty: "Intermediate", baseHours: 18, status: "locked" },
      { id: "web-rm-apis", title: "APIs & Integration", description: "Connect your apps to external services using REST APIs, fetch, and async JavaScript.", skills: ["APIs", "JavaScript"], difficulty: "Intermediate", baseHours: 10, status: "locked" },
      { id: "web-rm-portfolio", title: "Final Portfolio Project", description: "Combine everything into a polished portfolio project to showcase to employers.", skills: ["HTML", "CSS", "JavaScript", "React"], difficulty: "Advanced", baseHours: 16, status: "locked" },
    ],
  },

  "AI/ML Engineer": {
    skills: ["Python", "Math & Statistics", "NumPy & Pandas", "Machine Learning", "Deep Learning", "NLP & Computer Vision", "ML Deployment"],
    assessmentQuestions: [
      {
        id: "ml-q-python",
        skill: "Python",
        question: "Which Python library is commonly used for numerical array operations?",
        options: [
          o("a", "NumPy", 100),
          o("b", "Flask", 0),
          o("c", "React", 0),
          o("d", "Express", 0),
        ],
        correctOptionId: "a",
      },
      {
        id: "ml-q-math",
        skill: "Math & Statistics",
        question: "What does the standard deviation measure?",
        options: [
          o("a", "The average value of a dataset", 30),
          o("b", "How spread out data values are", 100),
          o("c", "The median of a dataset", 0),
          o("d", "The maximum value", 0),
        ],
        correctOptionId: "b",
      },
      {
        id: "ml-q-numpy",
        skill: "NumPy & Pandas",
        question: "In Pandas, which structure is used to store tabular data with labeled columns?",
        options: [
          o("a", "Array", 20),
          o("b", "DataFrame", 100),
          o("c", "List", 0),
          o("d", "Tuple", 0),
        ],
        correctOptionId: "b",
      },
      {
        id: "ml-q-ml",
        skill: "Machine Learning",
        question: "What is the main purpose of a train/test split in machine learning?",
        options: [
          o("a", "To increase the dataset size", 0),
          o("b", "To evaluate model performance on unseen data", 100),
          o("c", "To remove all missing values", 0),
          o("d", "To deploy the model", 0),
        ],
        correctOptionId: "b",
      },
      {
        id: "ml-q-dl",
        skill: "Deep Learning",
        question: "Which algorithm is commonly used for classification?",
        options: [
          o("a", "Linear Regression", 30),
          o("b", "Logistic Regression", 100),
          o("c", "PCA only", 0),
          o("d", "K-Means only", 0),
        ],
        correctOptionId: "b",
      },
      {
        id: "ml-q-nlp",
        skill: "NLP & Computer Vision",
        question: "What does NLP stand for in the context of AI?",
        options: [
          o("a", "New Language Protocol", 0),
          o("b", "Natural Language Processing", 100),
          o("c", "Network Layer Protocol", 0),
          o("d", "Neural Logic Programming", 20),
        ],
        correctOptionId: "b",
      },
      {
        id: "ml-q-deploy",
        skill: "ML Deployment",
        question: "Which tool is commonly used to serve ML models as APIs?",
        options: [
          o("a", "FastAPI or Flask", 100),
          o("b", "React Router", 0),
          o("c", "Webpack", 0),
          o("d", "Tailwind CSS", 0),
        ],
        correctOptionId: "a",
      },
    ],
    roadmap: [
      { id: "ml-rm-python", title: "Python Fundamentals", description: "Master Python syntax, data types, functions, and object-oriented programming basics.", skills: ["Python"], difficulty: "Beginner", baseHours: 12, status: "completed" },
      { id: "ml-rm-numpy", title: "NumPy & Pandas", description: "Learn numerical computing with NumPy arrays and data manipulation with Pandas DataFrames.", skills: ["NumPy & Pandas"], difficulty: "Beginner", baseHours: 10, status: "completed" },
      { id: "ml-rm-math", title: "Mathematics & Statistics", description: "Build foundations in linear algebra, calculus, probability, and statistics for ML.", skills: ["Math & Statistics"], difficulty: "Intermediate", baseHours: 16, status: "in-progress" },
      { id: "ml-rm-preprocess", title: "Data Preprocessing & Visualization", description: "Clean, transform, and visualize data using Pandas, Matplotlib, and Seaborn.", skills: ["NumPy & Pandas", "Python"], difficulty: "Intermediate", baseHours: 10, status: "locked" },
      { id: "ml-rm-ml", title: "Machine Learning Fundamentals", description: "Learn supervised and unsupervised algorithms: regression, classification, clustering.", skills: ["Machine Learning"], difficulty: "Intermediate", baseHours: 20, status: "locked" },
      { id: "ml-rm-dl", title: "Deep Learning", description: "Understand neural networks, backpropagation, and frameworks like TensorFlow and PyTorch.", skills: ["Deep Learning"], difficulty: "Advanced", baseHours: 24, status: "locked" },
      { id: "ml-rm-nlp", title: "NLP & Computer Vision", description: "Explore text processing, transformers, image classification, and CNNs.", skills: ["NLP & Computer Vision"], difficulty: "Advanced", baseHours: 18, status: "locked" },
      { id: "ml-rm-deploy", title: "Model Deployment", description: "Deploy ML models as APIs using FastAPI, Docker, and cloud platforms.", skills: ["ML Deployment"], difficulty: "Intermediate", baseHours: 12, status: "locked" },
      { id: "ml-rm-capstone", title: "AI/ML Capstone Project", description: "Build an end-to-end ML project from data collection to deployment.", skills: ["Python", "Machine Learning", "Deep Learning"], difficulty: "Advanced", baseHours: 20, status: "locked" },
    ],
  },

  "Data Analyst": {
    skills: ["SQL", "Excel", "Python", "Statistics", "Data Visualization", "Pandas"],
    assessmentQuestions: [
      {
        id: "da-q-sql",
        skill: "SQL",
        question: "Which SQL statement is used to retrieve data from a database?",
        options: [o("a", "GET", 0), o("b", "SELECT", 100), o("c", "FETCH", 30), o("d", "PULL", 0)],
        correctOptionId: "b",
      },
      {
        id: "da-q-excel",
        skill: "Excel",
        question: "Which Excel function is used to look up a value in a table by row?",
        options: [o("a", "VLOOKUP", 100), o("b", "SUM", 0), o("c", "AVERAGE", 0), o("d", "COUNT", 0)],
        correctOptionId: "a",
      },
      {
        id: "da-q-python",
        skill: "Python",
        question: "Which Python library is most commonly used for data analysis?",
        options: [o("a", "React", 0), o("b", "Pandas", 100), o("c", "Flask", 0), o("d", "Express", 0)],
        correctOptionId: "b",
      },
      {
        id: "da-q-stats",
        skill: "Statistics",
        question: "What is the median of the dataset [3, 1, 4, 1, 5]?",
        options: [o("a", "1", 0), o("b", "3", 100), o("c", "4", 30), o("d", "5", 0)],
        correctOptionId: "b",
      },
      {
        id: "da-q-viz",
        skill: "Data Visualization",
        question: "Which chart type is best for showing trends over time?",
        options: [o("a", "Pie chart", 0), o("b", "Line chart", 100), o("c", "Scatter plot", 30), o("d", "Bar chart", 20)],
        correctOptionId: "b",
      },
      {
        id: "da-q-pandas",
        skill: "Pandas",
        question: "In Pandas, which method is used to remove rows with missing values?",
        options: [o("a", "dropna()", 100), o("b", "fillna()", 30), o("c", "remove()", 0), o("d", "clean()", 0)],
        correctOptionId: "a",
      },
    ],
    roadmap: [
      { id: "da-rm-sql", title: "SQL Fundamentals", description: "Master SELECT, JOIN, GROUP BY, and subqueries for querying databases.", skills: ["SQL"], difficulty: "Beginner", baseHours: 10, status: "completed" },
      { id: "da-rm-excel", title: "Excel for Analysis", description: "Learn VLOOKUP, pivot tables, conditional formatting, and data cleaning.", skills: ["Excel"], difficulty: "Beginner", baseHours: 8, status: "completed" },
      { id: "da-rm-python", title: "Python for Data", description: "Use Python for data manipulation with loops, functions, and file I/O.", skills: ["Python"], difficulty: "Intermediate", baseHours: 12, status: "in-progress" },
      { id: "da-rm-stats", title: "Statistics & Probability", description: "Understand distributions, hypothesis testing, and statistical significance.", skills: ["Statistics"], difficulty: "Intermediate", baseHours: 14, status: "locked" },
      { id: "da-rm-pandas", title: "Pandas & Data Wrangling", description: "Clean, transform, and analyze tabular data with Pandas.", skills: ["Pandas", "Python"], difficulty: "Intermediate", baseHours: 12, status: "locked" },
      { id: "da-rm-viz", title: "Data Visualization", description: "Create compelling charts with Matplotlib, Seaborn, and Plotly.", skills: ["Data Visualization"], difficulty: "Intermediate", baseHours: 10, status: "locked" },
      { id: "da-rm-capstone", title: "Data Analysis Capstone", description: "Analyze a real dataset end-to-end and present actionable insights.", skills: ["SQL", "Python", "Data Visualization"], difficulty: "Advanced", baseHours: 16, status: "locked" },
    ],
  },

  "Software Developer": {
    skills: ["Java", "Data Structures", "Algorithms", "OOP", "Databases", "System Design"],
    assessmentQuestions: [
      {
        id: "sd-q-java",
        skill: "Java",
        question: "Which keyword is used to create a class in Java?",
        options: [o("a", "class", 100), o("b", "create", 0), o("c", "new", 30), o("d", "define", 0)],
        correctOptionId: "a",
      },
      {
        id: "sd-q-ds",
        skill: "Data Structures",
        question: "Which data structure operates on a Last-In-First-Out (LIFO) principle?",
        options: [o("a", "Queue", 0), o("b", "Stack", 100), o("c", "Tree", 0), o("d", "Graph", 0)],
        correctOptionId: "b",
      },
      {
        id: "sd-q-algo",
        skill: "Algorithms",
        question: "What is the time complexity of binary search on a sorted array?",
        options: [o("a", "O(n)", 30), o("b", "O(log n)", 100), o("c", "O(n²)", 0), o("d", "O(1)", 20)],
        correctOptionId: "b",
      },
      {
        id: "sd-q-oop",
        skill: "OOP",
        question: "Which OOP principle allows a subclass to override a parent method?",
        options: [o("a", "Encapsulation", 0), o("b", "Polymorphism", 100), o("c", "Abstraction", 30), o("d", "Inheritance", 40)],
        correctOptionId: "b",
      },
      {
        id: "sd-q-db",
        skill: "Databases",
        question: "Which type of database uses tables with rows and columns?",
        options: [o("a", "Relational (SQL)", 100), o("b", "Document (NoSQL)", 30), o("c", "Graph database", 0), o("d", "Key-value store", 0)],
        correctOptionId: "a",
      },
      {
        id: "sd-q-sysdesign",
        skill: "System Design",
        question: "What is the primary purpose of load balancing?",
        options: [o("a", "Encrypt data", 0), o("b", "Distribute traffic across servers", 100), o("c", "Compress responses", 0), o("d", "Cache results", 20)],
        correctOptionId: "b",
      },
    ],
    roadmap: [
      { id: "sd-rm-java", title: "Java Fundamentals", description: "Learn Java syntax, types, control flow, and core standard library.", skills: ["Java"], difficulty: "Beginner", baseHours: 14, status: "completed" },
      { id: "sd-rm-ds", title: "Data Structures", description: "Master arrays, linked lists, stacks, queues, trees, and hash maps.", skills: ["Data Structures"], difficulty: "Intermediate", baseHours: 16, status: "completed" },
      { id: "sd-rm-algo", title: "Algorithms", description: "Learn sorting, searching, recursion, dynamic programming, and complexity analysis.", skills: ["Algorithms"], difficulty: "Intermediate", baseHours: 18, status: "in-progress" },
      { id: "sd-rm-oop", title: "Object-Oriented Programming", description: "Understand classes, inheritance, polymorphism, encapsulation, and design patterns.", skills: ["OOP"], difficulty: "Intermediate", baseHours: 10, status: "locked" },
      { id: "sd-rm-db", title: "Databases", description: "Design relational schemas, write SQL, and learn indexing and normalization.", skills: ["Databases"], difficulty: "Intermediate", baseHours: 12, status: "locked" },
      { id: "sd-rm-sysdesign", title: "System Design Basics", description: "Learn scalability, load balancing, caching, and API design.", skills: ["System Design"], difficulty: "Advanced", baseHours: 14, status: "locked" },
      { id: "sd-rm-capstone", title: "Software Project Capstone", description: "Build a full application with clean architecture and tests.", skills: ["Java", "Databases", "System Design"], difficulty: "Advanced", baseHours: 20, status: "locked" },
    ],
  },

  "UI/UX Designer": {
    skills: ["Figma", "Wireframing", "Typography", "Color Theory", "Prototyping", "User Research"],
    assessmentQuestions: [
      {
        id: "ux-q-figma",
        skill: "Figma",
        question: "In Figma, what is a 'component' used for?",
        options: [o("a", "Database queries", 0), o("b", "Reusable UI elements", 100), o("c", "Image compression", 0), o("d", "Code compilation", 0)],
        correctOptionId: "b",
      },
      {
        id: "ux-q-wireframe",
        skill: "Wireframing",
        question: "What is the primary purpose of a wireframe?",
        options: [o("a", "Final visual design", 0), o("b", "Layout and structure planning", 100), o("c", "User testing", 20), o("d", "Code deployment", 0)],
        correctOptionId: "b",
      },
      {
        id: "ux-q-typo",
        skill: "Typography",
        question: "What does 'font weight' refer to?",
        options: [o("a", "The size of the font", 0), o("b", "The thickness of characters", 100), o("c", "The spacing between letters", 30), o("d", "The font family", 0)],
        correctOptionId: "b",
      },
      {
        id: "ux-q-color",
        skill: "Color Theory",
        question: "Which color scheme uses colors opposite each other on the color wheel?",
        options: [o("a", "Monochromatic", 0), o("b", "Complementary", 100), o("c", "Analogous", 30), o("d", "Triadic", 20)],
        correctOptionId: "b",
      },
      {
        id: "ux-q-proto",
        skill: "Prototyping",
        question: "What is the goal of interactive prototyping?",
        options: [o("a", "Write production code", 0), o("b", "Simulate user flows and test usability", 100), o("c", "Create final assets", 20), o("d", "Optimize performance", 0)],
        correctOptionId: "b",
      },
      {
        id: "ux-q-research",
        skill: "User Research",
        question: "Which method is best for understanding user behavior through direct observation?",
        options: [o("a", "Usability testing", 100), o("b", "A/B testing", 30), o("c", "Reading documentation", 0), o("d", "Competitor analysis", 20)],
        correctOptionId: "a",
      },
    ],
    roadmap: [
      { id: "ux-rm-figma", title: "Figma Fundamentals", description: "Learn Figma tools, frames, auto-layout, components, and styles.", skills: ["Figma"], difficulty: "Beginner", baseHours: 10, status: "completed" },
      { id: "ux-rm-wireframe", title: "Wireframing & Layout", description: "Plan layouts with low-fidelity wireframes and information architecture.", skills: ["Wireframing"], difficulty: "Beginner", baseHours: 8, status: "completed" },
      { id: "ux-rm-typo", title: "Typography & Visual Design", description: "Master font pairing, hierarchy, spacing, and visual balance.", skills: ["Typography"], difficulty: "Intermediate", baseHours: 10, status: "in-progress" },
      { id: "ux-rm-color", title: "Color Theory & Branding", description: "Understand color psychology, palettes, contrast, and brand systems.", skills: ["Color Theory"], difficulty: "Intermediate", baseHours: 8, status: "locked" },
      { id: "ux-rm-proto", title: "Prototyping & Interaction", description: "Build interactive prototypes with transitions, micro-interactions, and states.", skills: ["Prototyping"], difficulty: "Intermediate", baseHours: 10, status: "locked" },
      { id: "ux-rm-research", title: "User Research & Testing", description: "Conduct interviews, usability tests, and synthesize research insights.", skills: ["User Research"], difficulty: "Intermediate", baseHours: 12, status: "locked" },
      { id: "ux-rm-capstone", title: "UX Portfolio Project", description: "Design a complete product case study from research to high-fidelity prototype.", skills: ["Figma", "Wireframing", "Prototyping", "User Research"], difficulty: "Advanced", baseHours: 18, status: "locked" },
    ],
  },
};

/** Fallback career path for custom goals — uses Web Developer as a sensible default. */
export const DEFAULT_CAREER_PATH = CAREER_PATHS["Web Developer"];

export function getCareerPath(goal: string): CareerPath {
  return CAREER_PATHS[goal] ?? DEFAULT_CAREER_PATH;
}
