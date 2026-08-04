import type { Metadata } from "next";
import ResumeClientView from "@/components/Resume/ResumeClientView";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sojibahmed.vercel.app";

export const metadata: Metadata = {
  title: "Resume & Professional Skills | Aminur Islam Sojib",
  description:
    "Review the education, professional work experience at Softvence, and technical skills breakdown of Aminur Islam Sojib (Sojib Ahmed), Fullstack Developer in Dhaka, Bangladesh.",
  alternates: {
    canonical: `${baseUrl}/resume`,
  },
  openGraph: {
    title: "Resume & Professional Skills | Aminur Islam Sojib",
    description:
      "Review the professional experience at Softvence, education, and technical skills of Aminur Islam Sojib (Sojib Ahmed).",
    url: `${baseUrl}/resume`,
    siteName: "Aminur Islam Sojib Portfolio",
    images: [
      {
        url: `${baseUrl}/sojibahmed_pfp.jpg`,
        width: 1200,
        height: 630,
        alt: "Aminur Islam Sojib Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & Professional Skills | Aminur Islam Sojib",
    description:
      "Review the education, experience at Softvence, and technical skills of Aminur Islam Sojib.",
    images: [`${baseUrl}/sojibahmed_pfp.jpg`],
  },
};

export default function ResumePage() {
  return <ResumeClientView />;
}
