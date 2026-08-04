import type { Metadata } from "next";
import ProjectsClientView from "@/components/Portfolio/ProjectsClientView";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sojibahmed.vercel.app";

export const metadata: Metadata = {
  title: "Projects Showcase | Aminur Islam Sojib",
  description:
    "Explore full-stack web applications by Aminur Islam Sojib (Sojib Ahmed), including Shifa (healthcare platform) and Mess Manager (cost management system), built with Next.js, React, and MongoDB.",
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: "Projects Showcase | Aminur Islam Sojib",
    description:
      "Explore full-stack web applications by Aminur Islam Sojib (Sojib Ahmed), including Shifa (healthcare platform) and Mess Manager (cost management system).",
    url: `${baseUrl}/projects`,
    siteName: "Aminur Islam Sojib Portfolio",
    images: [
      {
        url: `${baseUrl}/aminur-islam-sojib-profile-photo.jpg`,
        width: 1200,
        height: 630,
        alt: "Aminur Islam Sojib Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Showcase | Aminur Islam Sojib",
    description:
      "Explore full-stack web applications built with Next.js, React, and MongoDB by Aminur Islam Sojib.",
    images: [`${baseUrl}/aminur-islam-sojib-profile-photo.jpg`],
  },
};

import Script from "next/script";

export default function ProjectsPage() {
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Shifa - Healthcare Platform",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        author: {
          "@type": "Person",
          name: "Aminur Islam Sojib",
          url: baseUrl,
        },
        description:
          "Comprehensive healthcare telemedicine & appointment management platform built with Next.js, React, Node.js, and MongoDB.",
      },
      {
        "@type": "SoftwareApplication",
        name: "Mess Manager - Cost Management System",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        author: {
          "@type": "Person",
          name: "Aminur Islam Sojib",
          url: baseUrl,
        },
        description:
          "Smart shared living cost & meal tracking application built with Next.js, React, and MongoDB.",
      },
    ],
  };

  return (
    <>
      <Script
        id="projects-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <ProjectsClientView />
    </>
  );
}

