import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AsideBar from "@/components/Shared/Asidebar/Asidebar";

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
      <body className={`${geistMono.variable} antialiased `}>
        <section className="bg-[#121212]">
          <section className="grid grid-cols-4 py-5 pb-12 md:pb-0 sm:py-12 px-5 sm:px-5 md:px-10 gap-5 sm:gap-10">
            <div className="col-span-4 lg:col-span-1 pb-10">
              <div className="sticky top-12 overflow-y-auto">
                <AsideBar />
              </div>
            </div>

            <div className="col-span-4 lg:col-span-3"> {children}</div>
          </section>
        </section>
      </body>
    </html>
  );
}
