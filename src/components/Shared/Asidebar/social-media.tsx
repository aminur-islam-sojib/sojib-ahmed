import { Linkedin, Facebook, Instagram, Github } from "lucide-react";
import Link from "next/link";

interface socialLinksType {
  id: number;
  title: string;
  username: string;
  url: string;
  icon: "Linkedin" | "Facebook" | "Github" | "Instagram";
}

const socialLinks: socialLinksType[] = [
  {
    id: 1,
    title: "LinkedIn",
    username: "Sheikh A. Sojib",
    url: "https://linkedin.com/in/sojibahmed-me/",
    icon: "Linkedin",
  },
  {
    id: 2,
    title: "Facebook",
    username: "Sheikh Sojib",
    url: "https://facebook.com/sojibahmed.me",
    icon: "Facebook",
  },
  {
    id: 3,
    title: "X (Twitter)",
    username: "AminurSojib",
    url: "https://github.com/aminur-islam-sojib",
    icon: "Github",
  },
  {
    id: 4,
    title: "Instagram",
    username: "sheikh_sadiq_bin_solaiman",
    url: "https://instagram.com/sojibahmed.dev",
    icon: "Instagram",
  },
];
const SocialMedia = () => {
  const icons = { Linkedin, Facebook, Github, Instagram };

  return (
    <div className=" flex mt-10 pb-5 justify-center gap-2">
      {socialLinks.map(({ id, url, icon }) => {
        const Icon = icons[icon];

        return (
          <div
            key={id}
            className="bgGradient p-2 rounded group hover:shadow-lg transition"
          >
            <Link href={url} target="_blank">
              <Icon
                color="var(--primary)"
                className="transition-transform duration-300 group-hover:scale-110"
                size={16}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMedia;
