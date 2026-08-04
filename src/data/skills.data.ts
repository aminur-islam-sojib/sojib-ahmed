// data/skills.ts
import { Terminal, Database, Layout, Server } from "lucide-react";

export const skillCategories = [
  {
    title: "Fullstack",
    icon: Layout,
    skills: [
      {
        name: "Next.js",
        description:
          "Server components, App Router, and performance optimization.",
      },
      {
        name: "React",
        description:
          "Component-driven UI development with Hooks and Context API.",
      },
      {
        name: "JavaScript (ES6+)",
        description:
          "Core logic, asynchronous programming, and DOM manipulation.",
      },
      {
        name: "TailwindCSS",
        description:
          "Utility-first styling and responsive, modern design systems.",
      },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        description:
          "High-performance server-side logic and runtime environments.",
      },
      {
        name: "Express.js",
        description: "Middleware architecture and robust REST API routing.",
      },
      {
        name: "Authentication",
        description: "Secure implementation of JWT, OAuth, and NextAuth.",
      },
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      {
        name: "MongoDB",
        description:
          "Document-based modeling and complex aggregation pipelines.",
      },
      {
        name: "Mongoose",
        description:
          "Schema validation and efficient data relationship mapping.",
      },
    ],
  },
  {
    title: "Tools & Deployment",
    icon: Terminal,
    skills: [
      {
        name: "Git & GitHub",
        description:
          "Version control, branching strategies, and CI/CD workflows.",
      },
      {
        name: "Vercel / Netlify",
        description: "Automated deployment and edge function management.",
      },
      {
        name: "Postman",
        description: "Thorough API testing and documentation workflows.",
      },
    ],
  },
];
