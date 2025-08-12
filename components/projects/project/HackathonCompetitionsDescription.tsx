import { ProjectStruct } from "@/utils/interfaces";

import React from "react";

const HackathonCompetitionsDescription: React.FC<{
  project: ProjectStruct;
}> = ({ project }) => {
  return (
    <div className="text-center">
      {project.description}
    </div>
  );
};

export default HackathonCompetitionsDescription;
