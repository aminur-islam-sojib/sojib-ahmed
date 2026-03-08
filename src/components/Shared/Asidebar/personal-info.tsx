import { motion } from "framer-motion";
import Image from "next/image";
import AsideContactInfo from "./aside-contact-info";

const PersonalInfo = () => {
  return (
    <div className=" lg:mt-5 flex lg:flex-col">
      <motion.div
        initial={{ filter: "blur(10px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 1 }}
        className=" flex lg:justify-center lg:items-center p-2 relative"
      >
        <figure className=" p-2 bgGradient rounded-3xl">
          <Image
            src="/sojibahmed_pfp.jpg"
            alt="Sojib Ahmed, Frontend Web Developer"
            width={110}
            height={110}
            priority
            className="h-27.5 w-27.5 rounded-2xl object-cover"
          />
        </figure>
      </motion.div>
      <div className=" flex mt-2 lg:mt-0 flex-col">
        <div>
          <h1 className=" text-2xl text-center m-3 font-medium">Sojib Ahmed</h1>
        </div>
        <div className="flex lg:justify-center lg:items-center ml-3 lg:ml-0">
          <div className="bg-surface-elevated text-brand-soft w-fit rounded border-r-2 border-primary px-4 py-1 text-[12px]">
            <h1> Web Developer</h1>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <AsideContactInfo />
      </div>
    </div>
  );
};

export default PersonalInfo;
