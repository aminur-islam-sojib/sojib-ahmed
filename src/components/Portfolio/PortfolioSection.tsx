"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects as fallbackProjects } from "@/data/projects.data";
import { Project } from "@/types/project.types";

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
  const [projectList, setProjectList] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjectList(json.data);
        }
      } catch (err) {
        console.error("Failed to load projects from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section className="">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projectList.map((project, index) => (
          <ProjectCard key={project._id || project.id} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

