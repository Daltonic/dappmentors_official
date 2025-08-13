import React from "react";
import Image from "next/image";
import Button from "../shared/Button";

const services = [
  {
    title: "Web3 Development",
    description:
      "Craft cutting-edge decentralized applications with our expert development services, tailored to your Web3 vision.",
    imageSrc: "/images/home/Content.png",
    alt: "Web3 Development",
    icon: "💻",
  },
  {
    title: "Web3 Education",
    description:
      "Empower your team with our comprehensive training programs, covering blockchain, smart contracts, and more.",
    imageSrc: "/images/home/Content(1).png",
    alt: "Web3 Education",
    icon: "🎓",
  },
  {
    title: "Blockchain Consulting",
    description:
      "Leverage our expertise to strategize and implement blockchain solutions for your business needs.",
    imageSrc: "/images/home/Content 2.png",
    alt: "Blockchain Consulting",
    icon: "🤝",
  },
  {
    title: "Community Empowerment",
    description:
      "Foster innovation through workshops, hackathons, and events that build a thriving Web3 community.",
    imageSrc: "/images/home/Content.png",
    alt: "Community Empowerment",
    icon: "🌐",
  },
];

interface ServiceProps {
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  icon: string;
}

const OurServices = () => {
  return (
    <section className="w-full bg-white dark:bg-[#1A1A1A] py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-screen-xl mx-auto relative">
        {/* Section Heading with Glow Effect */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 dark:animate-pulse">
            <p className="text-[#D2145A] font-inter font-semibold text-xs sm:text-sm md:text-base uppercase">
              Our Services
            </p>
            <div className="w-8 sm:w-12 md:w-16 border border-[#FFBAD4]"></div>
          </div>
          <h2 className="font-cambo font-normal text-3xl md:text-5xl tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6">
            Empowering Web3 Excellence with Dapp Mentors
          </h2>
          <p className="font-inter text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Discover how we drive innovation through development, education,
            consulting, and community initiatives.
          </p>
        </div>

        {/* Services Grid with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8 sm:mt-12">
        <button className="bg-[#D2145A] text-white hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base">
          View All Services
        </button>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({ service }: { service: ServiceProps }) => {
  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
      {/* Image Section */}
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <Image
          src={service.imageSrc}
          alt={service.alt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3">
        {service.description}
      </p>
      <Button
        label="Learn More"
        className="font-semibold bg-[#D2145A] text-white hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] w-full py-2 rounded-lg transition-all duration-300"
      />
    </div>
  );
};

export default OurServices;
