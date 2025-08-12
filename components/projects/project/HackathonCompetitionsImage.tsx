import React from 'react'
import Image from 'next/image'
import { ProjectStruct } from "@/utils/interfaces"

const HackathonCompetitionsImage: React.FC<{ project: ProjectStruct }> = ({ project }) => {
  return (
    <div className="relative w-full h-[180px] md:h-[280px] lg:h-[360px] mt-4"> {/* Adjust height as needed */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  )
}

export default HackathonCompetitionsImage;