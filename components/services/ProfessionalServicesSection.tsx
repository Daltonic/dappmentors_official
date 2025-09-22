// Professional Development Services Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";
import { useState } from "react";

interface ProfessionalServicesSectionProps {
  services: Service[];
}

const ProfessionalServicesSection = ({
  services,
}: ProfessionalServicesSectionProps) => {
  const [visibleServices, setVisibleServices] = useState(3); // Start with 3 services
  const servicesPerLoad = 3; // Number of services to load each time
  const totalServices = services.length; // Total number of services
  const displayedServices = services.slice(0, visibleServices);
  const hasMoreServices = visibleServices < totalServices; // Check if more services can be loaded

  const handleLoadMore = () => {
    setVisibleServices((prev) =>
      Math.min(prev + servicesPerLoad, totalServices),
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Professional Services
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Professional Web3 Development
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Bring your Web3 ideas to life with our end-to-end development
            solutions, built on modern tech stacks and blockchain expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {hasMoreServices && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Load More
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfessionalServicesSection;
