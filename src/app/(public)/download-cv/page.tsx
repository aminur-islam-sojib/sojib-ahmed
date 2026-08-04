import type { Metadata } from "next";
import DownloadCvClientView from "@/components/Download/DownloadCvClientView";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sojibahmed.vercel.app";

export const metadata: Metadata = {
  title: "Download CV & Resume | Aminur Islam Sojib",
  description:
    "Preview and download the official CV / resume of Aminur Islam Sojib (Sojib Ahmed), Fullstack Developer at Softvence in Dhaka, Bangladesh.",
  alternates: {
    canonical: `${baseUrl}/download-cv`,
  },
  openGraph: {
    title: "Download CV & Resume | Aminur Islam Sojib",
    description:
      "Preview and download the official CV / resume of Aminur Islam Sojib (Sojib Ahmed), Fullstack Developer at Softvence.",
    url: `${baseUrl}/download-cv`,
    siteName: "Aminur Islam Sojib Portfolio",
    images: [
      {
        url: `${baseUrl}/sojibahmed_pfp.jpg`,
        width: 1200,
        height: 630,
        alt: "Aminur Islam Sojib CV Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download CV & Resume | Aminur Islam Sojib",
    description:
      "Preview and download the official CV / resume of Aminur Islam Sojib (Sojib Ahmed).",
    images: [`${baseUrl}/sojibahmed_pfp.jpg`],
  },
};

export default function DownloadCVPage() {
  return <DownloadCvClientView />;
}
