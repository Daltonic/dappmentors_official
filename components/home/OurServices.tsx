import React from "react";
import Image from "next/image";

const services = [
  {
    title: "Web3 Development",
    description:
      "Craft cutting-edge decentralized applications with our expert development services, tailored to your Web3 vision.",
    imageSrc: "/images/home/Content.png",
    alt: "Web3 Development",
    icon: "💻",
    gradient: "from-purple-500 to-blue-600",
    accentColor: "purple",
  },
  {
    title: "Web3 Education",
    description:
      "Empower your team with our comprehensive training programs, covering blockchain, smart contracts, and more.",
    imageSrc: "/images/home/Content(1).png",
    alt: "Web3 Education",
    icon: "🎓",
    gradient: "from-emerald-500 to-teal-600",
    accentColor: "emerald",
  },
  {
    title: "Blockchain Consulting",
    description:
      "Leverage our expertise to strategize and implement blockchain solutions for your business needs.",
    imageSrc: "/images/home/Content 2.png",
    alt: "Blockchain Consulting",
    icon: "🤝",
    gradient: "from-orange-500 to-red-500",
    accentColor: "orange",
  },
  {
    title: "Community Empowerment",
    description:
      "Foster innovation through workshops, hackathons, and events that build a thriving Web3 community.",
    imageSrc: "/images/home/Content.png",
    alt: "Community Empowerment",
    icon: "🌐",
    gradient: "from-indigo-500 to-purple-600",
    accentColor: "indigo",
  },
];

interface ServiceProps {
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  icon: string;
  gradient: string;
  accentColor: string;
}

const OurServices = () => {
  return (
    <section className="w-full bg-white dark:bg-[#0A0A0A] py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10 px-4">
        {/* Section Heading with Enhanced Animation */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <p className="text-[#D2145A] font-inter font-semibold text-sm md:text-base uppercase tracking-wider relative z-10">
                Our Services
              </p>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D2145A]/20 to-[#FFBAD4]/20 blur-lg rounded-lg animate-pulse"></div>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4] animate-pulse"></div>
          </div>
          <h2 className="font-cambo font-normal text-4xl md:text-6xl tracking-tight text-gray-900 dark:text-white mb-6 relative">
            Empowering Web3 Excellence
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]">
              with Dapp Mentors
            </span>
          </h2>
          <p className="font-inter text-sm md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Discover how we drive innovation through development, education,
            consulting, and community initiatives.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <div className="text-center mt-16">
        <button className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            View All Services
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>
      </div>
    </section>
  );
};

// Enhanced Service Card Component with Modern Interactions
const ServiceCard = ({
  service,
  index,
}: {
  service: ServiceProps;
  index: number;
}) => {
  return (
    <div
      className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 hover:shadow-2xl transition-all duration-700 overflow-hidden cursor-pointer border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent"
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: "fadeInUp 0.8s ease-out forwards",
      }}
    >
      {/* Gradient Background on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      {/* Floating Icon */}
      <div className="relative mb-6">
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10`}
        >
          {service.icon}
        </div>
      </div>

      {/* Image Section with Enhanced Effects */}
      <div className="relative h-44 rounded-2xl overflow-hidden mb-6 group-hover:rounded-3xl transition-all duration-500">
        <Image
          src={service.imageSrc}
          alt={service.alt}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div
          className={`absolute inset-0 bg-gradient-to-t from-${service.accentColor}-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        ></div>

        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full group-hover:animate-ping"></div>
        <div className="absolute bottom-6 left-4 w-1 h-1 bg-white/40 rounded-full group-hover:animate-pulse"></div>
      </div>

      {/* Content with Enhanced Typography */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-500">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          {service.description}
        </p>

        {/* Enhanced Button */}
        <button className="group/btn relative w-full py-3 px-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-sm transition-all duration-500 hover:shadow-lg overflow-hidden group-hover:bg-gradient-to-r group-hover:from-[#D2145A] group-hover:to-[#FF4081] group-hover:text-white">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Learn More
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>

      {/* Subtle Border Glow */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
      ></div>
    </div>
  );
};

export default OurServices;
