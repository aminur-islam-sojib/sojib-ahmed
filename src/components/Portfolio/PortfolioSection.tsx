"use client";

import { motion } from "framer-motion";

import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects.data";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Clean staggered entrance
    },
  },
};

export default function PortfolioSection() {
  // Logic for filtering can be added here easily

  return (
    <section className="">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
