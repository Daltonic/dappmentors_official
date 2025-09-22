// Technical Writing Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";
import { useState } from "react";

interface TechnicalWritingSectionProps {
  services: Service[];
}

const TechnicalWritingSection = ({
  services,
}: TechnicalWritingSectionProps) => {
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
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
            Technical Writing & Content Creation
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Elevate your brand&apos;s presence in the Web3 space with
            high-quality technical content.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => (
            <ServiceCard key={index} service={service} transparent />
          ))}
        </div>

        {hasMoreServices && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              className="group relative text-base hover:shadow-2xl overflow-hidden bg-white text-[#D2145A] 
              py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105"
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

export default TechnicalWritingSection;
