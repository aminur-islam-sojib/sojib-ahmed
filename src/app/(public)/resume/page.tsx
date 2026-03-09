import EducationTimeLine from "@/components/Resume/EducationTimeLine";
import ExperienceTimeLine from "@/components/Resume/ExperienceTimeLine";
import HeaderGenerator from "@/components/ui/HeaderGenerator";

const Resume = () => {
  return (
    <div>
      <HeaderGenerator>Resume</HeaderGenerator>
      <div>
        <EducationTimeLine />
      </div>
      <div className=" my-10">
        <ExperienceTimeLine />
      </div>
      {/* <div>
        <Skills />
      </div> */}
    </div>
  );
};

export default Resume;
