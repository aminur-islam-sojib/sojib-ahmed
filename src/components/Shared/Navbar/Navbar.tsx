"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "about", path: "/about" },
    { name: "resume", path: "/resume" },
    { name: "projects", path: "/projects" },
    { name: "contact", path: "/contact" },
    { name: "download cv", path: "/cv.pdf" }, // or external link
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full lg:w-auto flex justify-center lg:justify-end py-3 md:py-5 p-1 md:px-4 rounded-tr-xl rounded-tl-xl sm:rounded-tr-3xl sm:rounded-tl-3xl lg:px-10 lg:rounded-tl-none bg-[#2b2b2cbf] backdrop-blur-[5px] border-t lg:border border-[#383838] lg:rounded-tr-2xl lg:rounded-bl-2xl"
    >
      <div className="flex gap-2 sm:gap-3 lg:gap-5 flex-wrap justify-center lg:flex-nowrap">
        {navLinks.map((tab, index) => {
          const isActive = pathname === tab.path;

          return (
            <Link key={index} href={tab.path}>
              <button
                className={`relative capitalize text-[13px] lg:text-[15px] cursor-pointer font-medium transition-colors duration-300 ease-in-out whitespace-nowrap ${
                  isActive && tab.name !== "download cv"
                    ? "text-primary"
                    : "text-white hover:text-gray-400"
                }`}
              >
                {isActive && tab.name !== "download cv" && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute -bottom-0.5 md:-bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <motion.span
                  initial={false}
                  animate={{
                    scale: isActive && tab.name !== "download cv" ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {tab.name}
                </motion.span>
              </button>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navbar;
