"use client";

import { useState } from "react";
import AsideContactInfo from "./aside-contact-info";
import GradientBorderButton from "./gradient-border-button";
import { AnimatePresence, motion } from "framer-motion";
import PersonalInfo from "./personal-info";

const AsideBar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className=" bg-[#1e1e1f]  border border-[#383838] relative rounded-2xl p-5 shadow-(--panel-shadow)">
      <motion.div
        initial={{ opacity: 0, y: -50, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1 }}
      >
        <PersonalInfo />
      </motion.div>
      <div className=" absolute top-0 right-0 rounded-2xl lg:hidden">
        <GradientBorderButton
          isOpen={isContactOpen}
          onToggle={() => setIsContactOpen((current) => !current)}
        />
      </div>
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className=" block lg:hidden"
          >
            <AsideContactInfo />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AsideBar;
