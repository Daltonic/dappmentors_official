import Button from "@/components/shared/Button";
import { ProjectStruct } from "@/utils/interfaces";

import React from "react";

const HackathonCompetitionsHeaderSection: React.FC<{
  project: ProjectStruct;
}> = ({ project }) => {
  return (
    <div className="text-center">
      <h3 className="text-[#D2145A] text-[12px] font-semibold mb-2">
        Project Details
      </h3>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
        {project.title}
      </h1>
      <Button
        label="Educational Material Support"
        className="text-[#D2145A] text-[12px] font-semibold bg-[#FFEFF5] dark:bg-white rounded-xl transition-colors duration-300 hover:bg-slate-100 dark:hover:bg-slate-300"
      />
    </div>
  );
};

export default HackathonCompetitionsHeaderSection;
