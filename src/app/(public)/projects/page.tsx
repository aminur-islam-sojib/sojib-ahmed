"use client";

import dynamic from "next/dynamic";
import HeaderGenerator from "@/components/ui/HeaderGenerator";
import { Suspense } from "react";

// Dynamically import the portfolio section with heavy animations
const PortfolioSection = dynamic(
  () => import("@/components/Portfolio/PortfolioSection"),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-[#202022] rounded-lg animate-pulse" />
        ))}
      </div>
    ),
    ssr: true,
  },
);

function page() {
  return (
    <div>
      <HeaderGenerator>Projects</HeaderGenerator>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-[#202022] rounded-lg animate-pulse"
              />
            ))}
          </div>
        }
      >
        <PortfolioSection />
      </Suspense>
    </div>
  );
}

export default page;
