// Web3 Education Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";

interface EducationSectionProps {
  services: Service[];
  onGetQuote: (service: Service) => void;
}

const EducationSection = ({ services, onGetQuote }: EducationSectionProps) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Web3 Development Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Unlock the skills to build cutting-edge decentralized applications
            with our expertly crafted educational resources.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onGetQuote={onGetQuote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
