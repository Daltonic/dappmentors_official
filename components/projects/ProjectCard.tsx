import Image from "next/image";
import Link from "next/link";

interface Project {
  slug: string;
  image: string;
  title: string;
  description: string;
  completed: boolean;
  raised: number;
  goal: number;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer">
        <div className="relative w-full h-48">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold dark:text-white">{project.title}</h3>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
          <p className="text-sm font-semibold mt-4 dark:text-white">
            {project.completed ? (
              <span>Completed: ${project.raised}</span>
            ) : (
              <>
                Raised: ${project.raised} / Goal: ${project.goal}
              </>
            )}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
            <div
              className="bg-[#D2145A] h-2 rounded-full"
              style={{ width: `${(project.raised / project.goal) * 100}%` }}
            ></div>
          </div>
          <button className="w-full bg-[#D2145A] hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] text-white py-2 rounded-lg font-semibold mt-4 transition-colors duration-500 dark:hover:bg-gray-200 dark:hover:text-[#D2145A]">
            Donate
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
