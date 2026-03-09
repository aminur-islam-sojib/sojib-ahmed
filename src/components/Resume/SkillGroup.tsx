import { LucideIcon } from "lucide-react";
import { SkillItem } from "./SkillItem";

interface SkillGroupProps {
  title: string;
  icon: LucideIcon;
  skills: { name: string; description: string }[];
  isLastGroup?: boolean;
}

export const SkillGroup = ({ title, icon: Icon, skills }: SkillGroupProps) => {
  return (
    <div className="relative pl-6">
      {/* Category Icon Header */}
      <section className="absolute -left-6 top-0 z-20">
        <div className="bgIcon w-fit p-3 rounded-xl bg-neutral-900 border border-neutral-800">
          <Icon size={24} color="var(--primary)" />
        </div>
      </section>

      {/* Line connecting Icon to first Dot */}
      <span className="absolute left-[-1.5px] top-12 w-px h-10 bg-gray-500"></span>

      <section className="mb-6">
        <h2 className="text-2xl font-medium p-3 text-white">{title}</h2>
      </section>

      {/* Skill List */}
      <div className="space-y-0">
        {/* Adjusted to 0 because SkillItem has pb-8 */}
        {skills.map((skill, index) => {
          const isLastItem = index === skills.length - 1;
          return (
            <SkillItem
              key={index}
              name={skill.name}
              description={skill.description}
              index={index}
              // The line stops if it's the last item in the group
              isLast={isLastItem}
            />
          );
        })}
      </div>
    </div>
  );
};
