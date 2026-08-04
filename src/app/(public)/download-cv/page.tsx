"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeaderGenerator from "@/components/ui/HeaderGenerator";
import DownloadButton from "@/components/Download/DownloadButton";
import FullscreenButton from "@/components/Download/FullscreenButton";

const DownloadCVPage = () => {
  const [cvUrl, setCvUrl] = useState("/Sojib_Ahmed_Resume.pdf");
  const [description, setDescription] = useState(
    "Preview my resume below. You can also download a copy to review in your own time or open it in fullscreen for a better viewing experience."
  );

  useEffect(() => {
    async function loadCv() {
      try {
        const res = await fetch("/api/cv");
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.cvUrl) setCvUrl(json.data.cvUrl);
          if (json.data.description) setDescription(json.data.description);
        }
      } catch (err) {
        console.error("Failed to load CV settings:", err);
      }
    }
    loadCv();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full">
      {/* Header */}
      <HeaderGenerator>Download CV</HeaderGenerator>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Description Section */}
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="text-base text-gray-300 tracking-tight leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* PDF Preview Container */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto w-full"
        >
          <div className="relative w-full border border-[#383838] rounded-2xl shadow-lg overflow-hidden bg-[#1a1a1a]">
            {/* Loading state and iframe */}
            <iframe
              src={cvUrl}
              title="Sojib Ahmed Resume"
              aria-label="Resume preview"
              className="w-full h-96 sm:h-125 md:h-187.5 rounded-2xl border-none"
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto w-full mt-8"
        >
          {/* Download Button */}
          <div>
            <DownloadButton cvUrl={cvUrl} />
          </div>

          {/* Open Fullscreen Button */}
          <div>
            <FullscreenButton cvUrl={cvUrl} />
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto w-full text-center"
        >
          <p className="text-sm text-gray-400">
            Having trouble viewing the preview? Download the PDF or open it in a
            new tab.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DownloadCVPage;
