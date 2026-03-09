"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const educations = [
  {
    id: 1,
    institution: "UNIVERSITY OF SCHOLARS",
    subject: "BSc - Computer Science And Engineering",
    session: "2025 - Ongoing",
  },
  {
    id: 2,
    institution: "SMMPLSC RAJSHAHI",
    subject: "HSC - Science",
    session: "2023 - 2024",
  },
  {
    id: 3,
    institution: "NAZIRPUR HIGH SCHOOL, NATORE",
    subject: "SSC - Science",
    session: "2021 - 2022",
  },
];

const EducationTimeLine = () => {
  return (
    <div className=" px-3  md:px-10">
      <div className="relative border-l border-gray-500 pl-6  space-y-8">
        <section className="absolute -left-6">
          <div className="bgIcon w-fit p-3 rounded-xl">
            <BookOpen color="var(--primary)" />
          </div>
        </section>
        <section>
          <h1 className=" text-2xl font-medium p-3">Education</h1>
        </section>

        {educations.map((edu, index) => (
          <motion.div
            key={edu.id}
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
                {edu.institution}
              </h3>
              <p className="text-xs text-foreground my-1">{edu.session}</p>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                {edu.subject}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationTimeLine;
