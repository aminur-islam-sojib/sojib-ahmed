"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "Junior Full-Stack Developer",
    role: " Freelance / Personal",
    duration: "2024 — Present",
  },
];

const ExperienceTimeLine = () => {
  return (
    <div className="px-3  md:px-10">
      <div className="relative border-l border-gray-500 pl-6  space-y-8">
        <section className="absolute -left-6">
          <div className="bgIcon w-fit p-3 rounded-xl">
            <BriefcaseBusiness color="var(--primary)" />
          </div>
        </section>
        <section>
          <h1 className=" text-2xl font-medium p-3">Experience</h1>
        </section>

        {experiences.length > 0
          ? experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Dot indicator */}
                <span className="dotIndicator absolute mt-1 -left-8.25 w-4 h-4 rounded-full z-10 shadow-md"></span>

                <div className=" rounded-xl pl-3">
                  <h3 className="text-[15px] font-semibold text-white">
                    {exp.company}
                  </h3>
                  <p className="text-xs text-foreground opacity-90 my-1">
                    {exp.duration}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-400">
                    {exp.role}
                  </p>
                </div>
              </motion.div>
            ))
          : "not added yet"}
      </div>
    </div>
  );
};

export default ExperienceTimeLine;
