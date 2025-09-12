// Developer Hiring Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";

interface DeveloperHiringSectionProps {
  services: Service[];
}

const DeveloperHiringSection = ({ services }: DeveloperHiringSectionProps) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Developer Hiring & Team Building
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Need top-tier Web3 talent for your project? We connect you with
            skilled blockchain developers from our community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperHiringSection;
