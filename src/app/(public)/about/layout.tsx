import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Sojib Ahmed",
  description:
    "Learn about Sojib Ahmed, a detail-oriented full stack web developer specializing in Node.js, Express.js, MongoDB, React, and Next.js.",
  openGraph: {
    title: "About - Sojib Ahmed",
    description:
      "Learn about Sojib Ahmed's expertise in web development and career journey.",
    url: "https://sojibahmed.vercel.app/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
