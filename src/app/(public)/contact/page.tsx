import type { Metadata } from "next";
import ContactForm from "@/components/Contact/ContactFrom";
import MapView from "@/components/Contact/MapView";
import HeaderGenerator from "@/components/ui/HeaderGenerator";
import React from "react";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sojibahmed.vercel.app";

export const metadata: Metadata = {
  title: "Contact Aminur Islam Sojib | Fullstack Developer",
  description:
    "Get in touch with Aminur Islam Sojib (Sojib Ahmed), Fullstack Developer at Softvence located in Dhaka, Bangladesh. Send a direct message or project inquiry.",
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contact Aminur Islam Sojib | Fullstack Developer",
    description:
      "Get in touch with Aminur Islam Sojib (Sojib Ahmed), Fullstack Developer at Softvence located in Dhaka, Bangladesh.",
    url: `${baseUrl}/contact`,
    siteName: "Aminur Islam Sojib Portfolio",
    images: [
      {
        url: `${baseUrl}/sojibahmed_pfp.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Aminur Islam Sojib",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aminur Islam Sojib | Fullstack Developer",
    description:
      "Get in touch with Aminur Islam Sojib (Sojib Ahmed), Fullstack Developer in Dhaka, Bangladesh.",
    images: [`${baseUrl}/sojibahmed_pfp.jpg`],
  },
};

export default function ContactPage() {
  return (
    <main>
      <HeaderGenerator>Contact</HeaderGenerator>
      <MapView />
      <ContactForm />
    </main>
  );
}
