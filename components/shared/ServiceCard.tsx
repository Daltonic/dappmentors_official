import { generateGradientFromString } from "@/heplers/global";
import { Service } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import React from "react";

interface ServiceCardProps {
  service: Service;
  transparent?: boolean; // New prop for transparency, defaults to false
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  transparent = false,
}) => {
  // Use provided gradient or generate a random one
  const gradient = generateGradientFromString(service.title);
  const router = useRouter();

  if (transparent) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group">
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
          >
            {service.icon}
          </div>
          {typeof service.price === "string" && !/\d/.test(service.price) && (
            <span className="bg-white text-[#D2145A] transition-all duration-300 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-bold">
              {service.price}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>

        <p className="text-white/80 mb-6 leading-relaxed">
          {service.description}
        </p>

        <div className="space-y-2 mb-8">
          {service.features?.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-white/70 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push(`/services/${service.slug}`)}
          className="w-full bg-white text-[#D2145A] py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105"
        >
          View Details
        </button>
      </div>
    );
  }

  return (
    <div className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with Gradient */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
          >
            {service.icon}
          </div>
          {typeof service.price === "string" && !/\d/.test(service.price) && (
            <span className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 rounded-full text-sm font-bold">
              {service.price}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#D2145A] transition-colors duration-300 line-clamp-2 mb-4">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features List */}
        {service.features && (
          <div className="space-y-2 mb-8">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Get Quote Button */}
        <button
          onClick={() => router.push(`/services/${service.slug}`)}
          className="w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#D2145A] group-hover:to-[#FF4081] group-hover:text-white hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
