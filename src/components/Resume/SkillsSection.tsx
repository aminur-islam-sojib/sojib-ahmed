// components/skills/SkillsSection.tsx
"use client";
import { motion } from "framer-motion";
import { SkillGroup } from "./SkillGroup";
import { skillCategories } from "../../data/skills.data";
import { BookOpen } from "lucide-react";

export const SkillsSection = () => {
  return (
    <section className=" text-neutral-300 overflow-hidden">
      <div className="max-w-4xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 py-5"
        >
          <div className=" flex  items-center  ">
            <div className="bgIcon w-fit p-3 rounded-xl">
              <BookOpen color="var(--primary)" />
            </div>
            <section>
              <h1 className=" text-3xl font-medium p-3"> Technical Arsenal</h1>
            </section>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-10 gap-x-16 gap-y-8">
          {skillCategories.map((group, index) => (
            <SkillGroup
              key={index}
              title={group.title}
              icon={group.icon}
              skills={group.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
