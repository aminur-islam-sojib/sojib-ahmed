import EducationTimeLine from "@/components/Resume/EducationTimeLine";
import ExperienceTimeLine from "@/components/Resume/ExperienceTimeLine";
import { SkillsSection } from "@/components/Resume/SkillsSection";
import HeaderGenerator from "@/components/ui/HeaderGenerator";

const Resume = () => {
  return (
    <main>
      <HeaderGenerator>Resume</HeaderGenerator>
      <EducationTimeLine />
      <div className=" my-10">
        <ExperienceTimeLine />
      </div>
      <SkillsSection />
    </main>
  );
};

export default Resume;
