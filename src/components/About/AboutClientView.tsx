"use client";

import dynamic from "next/dynamic";
import HeaderGenerator from "@/components/ui/HeaderGenerator";
import { motion } from "framer-motion";
import { Suspense } from "react";

const AboutCards = dynamic(() => import("@/components/About/AboutCards"), {
  loading: () => <div className="h-48 bg-[#202022] rounded-lg animate-pulse" />,
  ssr: true,
});

const CanDoList = dynamic(() => import("@/components/About/CanDoList"), {
  loading: () => <div className="h-96 bg-[#202022] rounded-lg animate-pulse" />,
  ssr: true,
});

export default function AboutClientView() {
  return (
    <div>
      <HeaderGenerator>About</HeaderGenerator>

      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-sm text-gray-300 tracking-tight"
        >
          <strong>I’m Aminur Islam Sojib (Sojib Ahmed),</strong> a detail-oriented Fullstack Developer at Softvence specializing in{" "}
          <strong>Next.js, React, Node.js, and MongoDB.</strong> I’m passionate about building user-friendly, scalable web applications
          that solve real business problems. <br /> <br />I enjoy working across
          the full stack, with a strong focus on{" "}
          <strong>
            modern Fullstack development using React and Next.js, creating fast,
            accessible, and user-friendly interfaces.
          </strong>{" "}
          I’m also comfortable with a wide range of modern tools and
          technologies, and I particularly enjoy working with{" "}
          <strong>TypeScript</strong> for scalable and maintainable codebases. <br /> <br /> I’m eager to contribute to a{" "}
          <strong>forward-thinking</strong>
          team, where I can grow long-term while helping drive innovation in web
          development. <br />
          <span className="font-medium">
            Currently open to software development projects and opportunities in Dhaka, Bangladesh and remotely.
          </span>
        </motion.div>
        <div className="my-10">
          <Suspense
            fallback={
              <div className="h-48 bg-[#202022] rounded-lg animate-pulse" />
            }
          >
            <AboutCards />
          </Suspense>
        </div>
        <div>
          <Suspense
            fallback={
              <div className="h-96 bg-[#202022] rounded-lg animate-pulse" />
            }
          >
            <CanDoList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
