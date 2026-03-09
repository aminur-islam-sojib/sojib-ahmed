import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Sojib Ahmed",
  description:
    "Get in touch with Sojib Ahmed. Send a message or reach out for collaboration opportunities.",
  openGraph: {
    title: "Contact - Sojib Ahmed",
    description: "Contact Sojib Ahmed for web development opportunities.",
    url: "https://sojibahmed.vercel.app/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
