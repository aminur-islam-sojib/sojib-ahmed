"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeaderGeneratorProps {
  children: ReactNode;
}

const HeaderGenerator = ({ children }: HeaderGeneratorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold mt-2">{children}</h1>
      <div className="my-5 py-0.5 w-10 bg-primary rounded-2xl"></div>
    </motion.div>
  );
};

export default HeaderGenerator;
