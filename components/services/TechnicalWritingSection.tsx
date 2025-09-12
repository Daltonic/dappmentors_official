// Technical Writing Section
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";

interface TechnicalWritingSectionProps {
  services: Service[];
}

const TechnicalWritingSection = ({
  services,
}: TechnicalWritingSectionProps) => {
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
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} transparent />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalWritingSection;
