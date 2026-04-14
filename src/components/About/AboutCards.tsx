"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface statsDataType {
  id: number;
  value: string;
  label: string;
}

interface GitHubStatsResponse {
  success: boolean;
  message: string;
  data?: {
    monthsExperience: number;
    projectsCompleted: number;
    commits: number;
  };
}

const fallbackStatsData: statsDataType[] = [
  {
    id: 1,
    value: "6+",
    label: "Month Experience",
  },
  {
    id: 2,
    value: "15+",
    label: "Projects Completed",
  },

  {
    id: 3,
    value: "20+",
    label: "Commits",
  },
  {
    id: 4,
    value: "24",
    label: "Support Hours",
  },
];

function formatValue(value: number): string {
  return `${value}+`;
}

const AboutCards = () => {
  const [statsData, setStatsData] = useState<statsDataType[]>(fallbackStatsData);

  useEffect(() => {
    const controller = new AbortController();

    const loadStats = async () => {
      let timeout: ReturnType<typeof setTimeout> | null = null;

      try {
        timeout = setTimeout(() => controller.abort(), 2500);
        const response = await fetch("/api/github/stats", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as GitHubStatsResponse;
        if (!payload.success || !payload.data) {
          return;
        }

        setStatsData([
          {
            id: 1,
            value: formatValue(payload.data.monthsExperience),
            label: "Month Experience",
          },
          {
            id: 2,
            value: "6+",
            label: "Projects Completed",
          },
          {
            id: 3,
            value: formatValue(payload.data.commits),
            label: "Commits",
          },
          {
            id: 4,
            value: "24",
            label: "Support Hours",
          },
        ]); 
        console.log(statsData)
      } catch {
        // Keep fallback values when network/API is unavailable.
      } finally {
        if (timeout) {
          clearTimeout(timeout);
        }
      }
    };

    void loadStats();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center   bg-[#202022] border border-[#383838] rounded-2xl p-7 bg-linear-to-br from-[#2d2d2e40] to-[#1b1b1d00]">
      {statsData.map((data) => (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: data.id * 0.1,
            ease: "easeInOut", // or "easeInOut" for smoother start/end
          }}
          key={data.id}
          className=" flex cursor-pointer flex-col hover:scale-105 duration-400 hover:shadow-2xl justify-center items-center p-5 uppercase border-2 border-[#383838] rounded-2xl shadow-lg bg-linear-to-br from-[#404040] from-0% to-[#40404000] to-50%"
        >
          <h1 className=" text-4xl text-primary font-medium">{data.value}</h1>
          <h1 className=" text-center text-[#d6d6d6] text-sm mt-3">
            {data.label}
          </h1>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutCards;
