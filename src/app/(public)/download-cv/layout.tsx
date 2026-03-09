import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download CV - Sojib Ahmed",
  description: "Download Sojib Ahmed's CV and resume as a PDF.",
  openGraph: {
    title: "Download CV - Sojib Ahmed",
    description: "Download professional CV and resume.",
    url: "https://sojibahmed.vercel.app/download-cv",
  },
};

export default function DownloadCVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
