"use client";

import CardImage from "@/components/shared/CardImage";
import { Service } from "@/utils/interfaces";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import { useDelete } from "@/contexts/DeleteContext";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
  selectedServices: Set<string>;
  toggleServiceSelection: (serviceId: string) => void;
  getTypeColor: (type: Service["type"]) => string;
  getStatusColor: (status: Service["status"]) => string;
  onServiceUpdate?: (service: Service) => void;
  onServiceDelete?: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  selectedServices,
  toggleServiceSelection,
  getTypeColor,
  getStatusColor,
  onServiceDelete,
}) => {
  const router = useRouter();
  const { showDeleteModal } = useDelete();

  // Handle delete action by triggering the context modal
  const handleDeleteService = () => {
    showDeleteModal({
      apiUrl: `/api/services/${service.id}`,
      itemTitle: service.title,
      onSuccess: () => onServiceDelete?.(service.id),
      entity: "service",
    });
  };

  // Handle edit navigation
  const handleEditService = () => {
    router.push(`/dashboard/services/${service.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <CardImage
          src={service.thumbnail}
          alt={service.title}
          width={400}
          height={192}
          className="group-hover:scale-110 transition-transform duration-700"
          rounded={false}
          objectFit="cover"
          showInitials={true}
        />

        {/* Checkbox Overlay */}
        <div className="absolute top-4 left-4">
          <input
            type="checkbox"
            checked={selectedServices.has(service.id)}
            onChange={() => toggleServiceSelection(service.id)}
            className="w-4 h-4 text-[#D2145A] bg-white/90 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
          />
        </div>

        {/* Status and Featured Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {service.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(service.status)}`}
          >
            {service.status.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-10">
        {/* Header: Type Badge and Price */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getTypeColor(service.type)}`}
          >
            {service.type}
          </span>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof service.price === "number"
                ? `$${service.price}`
                : service.price}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {service.clients} client{service.clients !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {service.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {service.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{service.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Service Details */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Duration:</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {service.duration}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Lead:</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {service.lead}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Category:</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {service.category}
            </span>
          </div>
          {service.rating > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Rating:</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {service.rating}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({service.totalReviews} review
                  {service.totalReviews !== 1 ? "s" : ""})
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Updated:</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">
              {new Date(service.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Edit Button */}
          <button
            onClick={handleEditService}
            className="flex-1 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-2 px-4 rounded-xl text-sm font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
            title="Edit service"
          >
            <FiEdit className="w-4 h-4" />
            Edit
          </button>

          {/* View Button */}
          <Link
            href={`/services/${service.slug}`}
            target="_blank"
            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition-colors"
            title="View service details"
          >
            <FiEye className="w-5 h-5" />
          </Link>

          {/* Delete Button */}
          <button
            onClick={handleDeleteService}
            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl transition-colors"
            title="Delete service"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
