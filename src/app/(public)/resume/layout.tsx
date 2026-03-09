import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume - Sojib Ahmed",
  description:
    "View Sojib Ahmed's professional resume, experience, education, and technical skills as a full stack web developer.",
  openGraph: {
    title: "Resume - Sojib Ahmed",
    description: "Professional resume and experience of Sojib Ahmed.",
    url: "https://sojibahmed.vercel.app/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
