import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Sojib Ahmed",
  description:
    "Explore Sojib Ahmed's portfolio of web development projects including full stack applications, telemedicine platforms, and more.",
  openGraph: {
    title: "Projects - Sojib Ahmed",
    description: "View portfolio projects and web development work.",
    url: "https://sojibahmed.vercel.app/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
