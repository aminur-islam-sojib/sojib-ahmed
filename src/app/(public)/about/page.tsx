import type { Metadata } from "next";
import AboutClientView from "@/components/About/AboutClientView";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sojibahmed.vercel.app";

export const metadata: Metadata = {
  title: "About Aminur Islam Sojib | Fullstack Developer",
  description:
    "Discover the background, technical skills, and experience of Aminur Islam Sojib (Sojib Ahmed), a Fullstack Developer at Softvence specializing in Next.js, React, and MongoDB based in Dhaka, Bangladesh.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About Aminur Islam Sojib | Fullstack Developer",
    description:
      "Discover the technical background, skills, and experience of Aminur Islam Sojib (Sojib Ahmed), Fullstack Developer at Softvence.",
    url: `${baseUrl}/about`,
    siteName: "Aminur Islam Sojib Portfolio",
    images: [
      {
        url: `${baseUrl}/sojibahmed_pfp.jpg`,
        width: 1200,
        height: 630,
        alt: "Aminur Islam Sojib - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aminur Islam Sojib | Fullstack Developer",
    description:
      "Fullstack Developer at Softvence specializing in Next.js, React, and MongoDB.",
    images: [`${baseUrl}/sojibahmed_pfp.jpg`],
  },
};

export default function AboutPage() {
  return <AboutClientView />;
}
