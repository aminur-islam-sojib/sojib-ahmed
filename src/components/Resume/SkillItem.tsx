"use client";
import { motion } from "framer-motion";

interface SkillItemProps {
  name: string;
  description: string;
  index: number;
  isLast?: boolean; // New prop to control the line
}

export const SkillItem = ({
  name,
  description,
  index,
  isLast,
}: SkillItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-3 pb-8" // Added bottom padding for spacing
    >
      {/* Vertical Line Logic */}
      {!isLast && (
        <span className="absolute left-[-25.5px] top-5 w-px h-full bg-gray-500"></span>
      )}

      {/* Dot indicator */}
      <span className="dotIndicator absolute  -left-8.25 w-4 h-4 rounded-full z-10 shadow-md"></span>

      <div className="flex flex-col gap-1">
        <h3 className="text-[15px] font-semibold text-white leading-none">
          {name}
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
