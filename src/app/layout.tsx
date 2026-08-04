import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Optimize font loading with preload and only essential weights
const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  fallback: ["monospace"],
});

const APP_THEME = "portfolio-gold";
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sojibahmed.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Aminur Islam Sojib - Fullstack Developer | Next.js & React",
    template: "%s | Aminur Islam Sojib",
  },
  description:
    "Aminur Islam Sojib (Sojib Ahmed) is a Fullstack Developer at Softvence specializing in Next.js, React, and MongoDB based in Dhaka, Bangladesh.",
  keywords: [
    "Aminur Islam Sojib",
    "Sojib Ahmed",
    "Sojib",
    "Aminur Islam",
    "Fullstack Developer",
    "Next.js Developer",
    "React Developer",
    "MongoDB",
    "Dhaka Bangladesh Developer",
    "Softvence",
    "Shifa Healthcare",
    "Mess Manager",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Aminur Islam Sojib", url: baseUrl }],
  creator: "Aminur Islam Sojib",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Aminur Islam Sojib - Portfolio",
    title: "Aminur Islam Sojib - Fullstack Developer | Next.js & React",
    description:
      "Fullstack Developer at Softvence specializing in Next.js, React, and MongoDB based in Dhaka, Bangladesh.",
    images: [
      {
        url: `${baseUrl}/aminur-islam-sojib-profile-photo.jpg`,
        width: 1200,
        height: 630,
        alt: "Aminur Islam Sojib - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aminur Islam Sojib - Fullstack Developer | Next.js & React",
    description:
      "Fullstack Developer at Softvence specializing in Next.js, React, and MongoDB based in Dhaka, Bangladesh.",
    images: [`${baseUrl}/aminur-islam-sojib-profile-photo.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Aminur Islam Sojib",
        alternateName: ["Sojib", "Sojib Ahmed", "Aminur", "Aminur Islam"],
        url: baseUrl,
        jobTitle: "Fullstack Developer",
        worksFor: {
          "@type": "Organization",
          name: "Softvence",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "Bangladesh",
        },
        image: `${baseUrl}/aminur-islam-sojib-profile-photo.jpg`,
        sameAs: [
          "https://github.com/aminur-islam-sojib",
          "https://linkedin.com/in/aminur-islam-sojib",
          "https://codeforces.com/profile/sojibahmed.me",
        ],
        description:
          "Fullstack Developer at Softvence specializing in Next.js, React, and MongoDB based in Dhaka, Bangladesh.",
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Aminur Islam Sojib - Portfolio",
        description:
          "Official Portfolio Website of Aminur Islam Sojib (Fullstack Developer at Softvence)",
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#profilepage`,
        url: baseUrl,
        name: "Aminur Islam Sojib Profile Page",
        mainEntity: {
          "@id": `${baseUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      data-theme={APP_THEME}
      className={cn("dark font-sans scroll-smooth", poppins.variable)}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
      <body
        className={`${geistMono.variable} antialiased bg-[#121212]`}
        suppressHydrationWarning
      >
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


