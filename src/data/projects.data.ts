import { Project } from "@/types/project.types";

export const projects: Project[] = [
  {
    id: 1,
    name: "Mess Manager",
    description:
      "Production-grade role-based web app for managing shared living spaces with real-time meal tracking, expense management, and secure member invitations.",
    image: "/mess-manager.png",
    liveUrl: "https://mess-manager.vercel.app",
    category: "Full Stack",
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "MongoDB",
      "NextAuth",
      "Tailwind CSS",
      "Framer Motion",
    ],
    githubClient: "https://github.com/aminur-islam-sojib/Mess-Manager",
  },
  {
    id: 2,
    name: "Shifa - Telimedicine App",
    description:
      "Web-based telemedicine platform enabling patients to consult verified doctors through real-time in-app video calls, receive digital prescriptions, and manage healthcare remotely in a secure environment.",
    image: "/shifa.png",
    liveUrl: "https://shifa-telemedicine.vercel.app",
    category: "Full Stack",
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "MongoDB",
      "NextAuth",
      "Tailwind CSS",
      "Zod",
      "SSLCommerz",
    ],
    githubClient: "https://github.com/ShifaLabs/shifa",
  },
  {
    id: 4,
    name: "Sojib Ahmed - Web Developer",
    description:
      "Professional portfolio website showcasing web development projects, skills, and experience with modern design and interactive components.",
    image: "/sojibahmed_pfp.jpg",
    liveUrl: "https://sojib-ahmed.netlify.app",
    category: "Portfolio",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Redux Toolkit",
      "Tailwind CSS",
      "Framer Motion",
      "Embla Carousel",
    ],
    githubClient:
      "https://github.com/aminur-islam-sojib/Sojib-Ahmed-Web-Developer",
  },
  {
    id: 3,
    name: "AabohawaX - Weather Tracker",
    description:
      "Modern weather web app providing real-time weather conditions, 5-day forecasts, and current location detection with elegant UI and full dark mode support.",
    image: "/aabohawax.png",
    liveUrl: "https://aabohawax.netlify.app",
    category: "Web Development",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "React Query",
      "Shadcn UI",
      "Tailwind CSS",
      "OpenWeather API",
    ],
    githubClient: "https://github.com/aminur-islam-sojib/AabohawaX",
  },
];
