import { Palette, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: 1,
    title: "Web Design",
    description:
      "The most modern and high-quality design made at a professional level.",
    icon: Palette,
  },
  {
    id: 2,
    title: "Web Development",
    description: "High-quality development of sites at the professional level.",
    icon: Code2,
  },
];

const CanDoList = () => {
  return (
    <div>
      <h1 className=" text-xl font-semibold mb-5">What i&apos;m doing</h1>

      <div className=" grid md:grid-cols-2 gap-5">
        {servicesData.map(({ id, title, description, icon: Icon }) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            key={id}
            className=" bgGrayGradient flex flex-col items-center sm:items-start sm:flex-row  gap-4 p-8 bgGrayGradient rounded-xl relative "
          >
            <div className="bgIcon h-fit w-fit p-2 rounded-xl">
              <Icon color="var(--primary)" size={28} />
            </div>
            <div className=" flex flex-col items-center sm:items-start gap-2">
              <h1 className="text-[18px] font-medium">{title}</h1>
              <h1 className=" text-sm text-gray-300 tracking-tight text-center sm:text-left">
                {description}
              </h1>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CanDoList;
