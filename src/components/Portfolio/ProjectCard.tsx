"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Github, ChevronDown, ChevronUp } from "lucide-react";
import { Project } from "@/types/project.types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = memo(({ project, index }: ProjectCardProps) => {
  const [showAllTech, setShowAllTech] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border flex flex-col border-[#383838] rounded-2xl p-px backdrop-blur-sm hover:border-amber-400 transition-all duration-300 bg-[#1e1e1f]"
    >
      {/* Thumbnail Area */}
      <div className="relative group w-auto h-40 rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="w-full h-full object-cover transition-all group-hover:scale-110 duration-300 group-hover:brightness-50"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23202022' width='400' height='300'/%3E%3C/svg%3E"
        />

        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            target="_blank"
            href={project.liveUrl}
            rel="noopener noreferrer"
            className="p-3 bg-[#383838] shadow-md hover:bg-[#4a4a4a] transition rounded-xl"
            title="View Live Site"
          >
            <Eye color="#FFDB70" size={20} />
          </a>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-medium text-white text-lg leading-snug">
          {project.name}
        </h3>
        {/* Category color if add description then :  text-amber-300 */}
        <p className="text-sm text-gray-300 mt-1">{project.category}</p>

        {/* Description - Added with Line Clamp for Scalability */}
        {/* <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">
          {project.description}
        </p> */}

        {/* Tech Stack Badges */}
        <div className="my-3">
          <div className="flex flex-wrap gap-1.5">
            <AnimatePresence initial={false}>
              {(showAllTech
                ? project.techStack
                : project.techStack.slice(0, 3)
              ).map((tech) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] px-2.5 py-1 bg-[#383838] text-amber-200 rounded-full border border-[#4a4a4a] hover:border-amber-400 transition-colors duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </AnimatePresence>

            {/* Toggle Button */}
            {project.techStack.length > 3 && (
              <button
                onClick={() => setShowAllTech(!showAllTech)}
                className="text-[10px] px-2.5 py-1 bg-[#383838]/50 text-gray-400 rounded-full border border-[#4a4a4a] hover:text-amber-400 hover:border-amber-400 transition-all flex items-center gap-1"
              >
                {showAllTech ? (
                  <>
                    Show Less <ChevronUp size={10} />
                  </>
                ) : (
                  <>
                    +{project.techStack.length - 3} <ChevronDown size={10} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-[#383838]">
          {project.githubClient && (
            <a
              href={project.githubClient}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#383838] hover:bg-[#4a4a4a] text-white text-xs rounded-lg border border-[#4a4a4a] hover:border-amber-400 transition-all duration-200 group"
            >
              <Github
                size={14}
                className="group-hover:text-amber-400 transition-colors"
              />
              <span>{project.githubServer ? "Client" : "Github"}</span>
            </a>
          )}
          {project.githubServer && (
            <a
              href={project.githubServer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#383838] hover:bg-[#4a4a4a] text-white text-xs rounded-lg border border-[#4a4a4a] hover:border-amber-400 transition-all duration-200 group"
            >
              <Github
                size={14}
                className="group-hover:text-amber-400 transition-colors"
              />
              <span>Server</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
