import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AsideBar from "@/components/Shared/Asidebar/Asidebar";
import Navbar from "@/components/Shared/Navbar/Navbar";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_THEME = "portfolio-gold";

export const metadata: Metadata = {
  title: "Sojib Ahmed",
  description: "Portfolio and personal profile for Sojib Ahmed.",
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
      className={cn("dark font-sans", poppins.variable)}
    >
      <body
        className={`${geistMono.variable} antialiased `}
        suppressHydrationWarning
      >
        <section className="bg-[#121212]  pb-10">
          <section className="grid grid-cols-4 py-5 pb-12 md:pb-0 sm:py-12 px-5 sm:px-5 md:px-10 gap-5 sm:gap-10">
            <aside className="col-span-4 lg:col-span-1">
              <div className="sticky top-12 overflow-y-auto">
                <AsideBar />
              </div>
            </aside>

            <main className="col-span-4 md:col-span-4 lg:col-span-3">
              <div className="bg-[#1e1e1f] w-full border border-[#383838] rounded-2xl p-5 relative ">
                {/* Add padding-bottom on mobile to prevent content being hidden behind navbar */}

                <div className="fixed bottom-0 left-0 right-0 z-50 lg:absolute lg:top-0 lg:right-0 lg:left-auto lg:bottom-auto">
                  <Navbar />
                </div>

                <div className=" w-full">{children}</div>
              </div>
            </main>
          </section>
        </section>
      </body>
    </html>
  );
}
