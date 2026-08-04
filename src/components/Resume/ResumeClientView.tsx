"use client";

import dynamic from "next/dynamic";
import HeaderGenerator from "@/components/ui/HeaderGenerator";
import { Suspense } from "react";

const EducationTimeLine = dynamic(
  () => import("@/components/Resume/EducationTimeLine"),
  {
    loading: () => (
      <div className="h-96 bg-[#202022] rounded-lg animate-pulse" />
    ),
    ssr: true,
  },
);

const ExperienceTimeLine = dynamic(
  () => import("@/components/Resume/ExperienceTimeLine"),
  {
    loading: () => (
      <div className="h-96 bg-[#202022] rounded-lg animate-pulse" />
    ),
    ssr: true,
  },
);

const SkillsSection = dynamic(
  () =>
    import("@/components/Resume/SkillsSection").then((mod) => ({
      default: mod.SkillsSection,
    })),
  {
    loading: () => (
      <div className="h-96 bg-[#202022] rounded-lg animate-pulse" />
    ),
    ssr: true,
  },
);

export default function ResumeClientView() {
  return (
    <main>
      <HeaderGenerator>Resume</HeaderGenerator>
      <Suspense
        fallback={
          <div className="h-96 bg-[#202022] rounded-lg animate-pulse" />
        }
      >
        <EducationTimeLine />
      </Suspense>
      <div className="my-10">
        <Suspense
          fallback={
            <div className="h-96 bg-[#202022] rounded-lg animate-pulse" />
          }
        >
          <ExperienceTimeLine />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <div className="h-96 bg-[#202022] rounded-lg animate-pulse" />
        }
      >
        <SkillsSection />
      </Suspense>
    </main>
  );
}
