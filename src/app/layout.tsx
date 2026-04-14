import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

import AsideBar from "@/components/Shared/Asidebar/Asidebar";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    default: "Sojib Ahmed - Full Stack Web Developer",
    template: "%s | Sojib Ahmed",
  },
  description:
    "Full stack web developer specializing in Next.js, React, Node.js, and MongoDB. Building scalable, user-friendly web applications.",
  keywords: [
    "Web Developer",
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "Full Stack",
    "Web Development",
    "Frontend",
    "Backend",
    "TypeScript",
  ],
  authors: [{ name: "Sojib Ahmed", url: baseUrl }],
  creator: "Sojib Ahmed",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Sojib Ahmed - Web Developer",
    title: "Sojib Ahmed - Full Stack Web Developer",
    description:
      "Full stack web developer specializing in Next.js, React, Node.js, and MongoDB.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Sojib Ahmed - Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sojib Ahmed - Full Stack Web Developer",
    description:
      "Full stack web developer specializing in Next.js, React, Node.js, and MongoDB.",
    images: [`${baseUrl}/og-image.png`],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={APP_THEME}
      className={cn("dark font-sans scroll-smooth", poppins.variable)}
    >
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="https://api.github.com" />

        {/* JSON-LD Schema for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sojib Ahmed",
              url: baseUrl,
              jobTitle: "Full Stack Web Developer",
              image: `${baseUrl}/sojibahmed_pfp.jpg`,
              description:
                "Full stack web developer specializing in Next.js, React, Node.js, and MongoDB.",
            }),
          }}
        />
      </head>
      <body
        className={`${geistMono.variable} antialiased bg-[#121212]`}
        suppressHydrationWarning
      >
        <section className="pb-10">
          <section className="grid grid-cols-4 py-5 pb-12 md:pb-0 sm:py-12 px-5 sm:px-5 md:px-10 gap-5 sm:gap-10">
            <aside className="col-span-4 lg:col-span-1">
              <div className="sticky top-12 overflow-y-auto">
                <AsideBar />
              </div>
            </aside>

            <main className="col-span-4 md:col-span-4 lg:col-span-3">
              <div className="bg-[#1e1e1f] w-full border border-[#383838] rounded-2xl p-5 relative">
                <div className="fixed bottom-0 left-0 right-0 z-50 lg:absolute lg:top-0 lg:right-0 lg:left-auto lg:bottom-auto">
                  <Navbar />
                </div>

                <div className="w-full">{children}</div>
              </div>
            </main>
          </section>
        </section> 
        <Analytics/>
        <SpeedInsights/>
      </body>
    
    </html>
  );
}
