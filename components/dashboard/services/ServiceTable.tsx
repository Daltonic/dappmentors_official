import { Service } from "@/utils/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FiChevronUp,
  FiChevronDown,
  FiEdit,
  FiEye,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// SortIcon Component
const SortIcon: React.FC<{
  column: keyof Service;
  sortConfig: { key: keyof Service; direction: "asc" | "desc" } | null;
}> = ({ column, sortConfig }) => {
  if (!sortConfig || sortConfig.key !== column) {
    return <FiChevronDown className="w-4 h-4 opacity-30" />;
  }

  return sortConfig.direction === "asc" ? (
    <FiChevronUp className="w-4 h-4 text-[#D2145A]" />
  ) : (
    <FiChevronDown className="w-4 h-4 text-[#D2145A]" />
  );
};

// ServiceTable Component
const ServiceTable: React.FC<{
  sortedServices: Service[];
  selectedServices: Set<string>;
  toggleServiceSelection: (serviceId: string) => void;
  toggleAllServices: () => void;
  handleSort: (key: keyof Service) => void;
  sortConfig: { key: keyof Service; direction: "asc" | "desc" } | null;
  getTypeColor: (type: Service["type"]) => string;
  getStatusColor: (status: Service["status"]) => string;
}> = ({
  sortedServices,
  selectedServices,
  toggleServiceSelection,
  toggleAllServices,
  handleSort,
  sortConfig,
  getTypeColor,
  getStatusColor,
}) => {
  const router = useRouter();

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <th className="text-left px-4 py-4 w-12">
                <input
                  type="checkbox"
                  checked={
                    selectedServices.size === sortedServices.length &&
                    sortedServices.length > 0
                  }
                  onChange={toggleAllServices}
                  className="w-4 h-4 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                />
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[300px]"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center gap-2">
                  Service
                  <SortIcon column="title" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => handleSort("type")}
              >
                <div className="flex items-center gap-2">
                  Type
                  <SortIcon column="type" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon column="status" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center gap-2">
                  Price
                  <SortIcon column="price" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                onClick={() => handleSort("clients")}
              >
                <div className="flex items-center gap-2">
                  Clients
                  <SortIcon column="clients" sortConfig={sortConfig} />
                </div>
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[100px]">
                Rating
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]">
                Updated
              </th>
              <th className="text-right px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedServices.map((service, index) => (
              <motion.tr
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-300 group"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedServices.has(service.id)}
                    onChange={() => toggleServiceSelection(service.id)}
                    className="w-4 h-4 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={service.thumbnail}
                      alt={service.title}
                      width={48}
                      height={32}
                      className="w-12 h-8 object-cover rounded-lg flex-shrink-0"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-1">
                        {service.lead} • {service.category}
                      </p>
                      {service.featured && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getTypeColor(service.type)}`}
                  >
                    {service.type}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(service.status)}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
                        service.status === "active"
                          ? "bg-green-400"
                          : service.status === "coming-soon"
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                      }`}
                    />
                    {service.status.replace("-", " ")}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {typeof service.price === "number"
                      ? `${service.price}`
                      : service.price}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {service.clients.toLocaleString()}
                    </span>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      clients
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {service.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {service.rating}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({service.totalReviews})
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      No ratings
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(service.updatedAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/services/${service.id}`)
                      }
                      className="p-2 text-[#D2145A] hover:bg-[#FF4081]/10 dark:text-[#FF4081] dark:hover:bg-[#FF4081]/20 rounded-lg transition-all duration-300 hover:scale-110"
                      title="Edit service"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => router.push(`/services/${service.id}`)}
                      className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300 hover:scale-110"
                      title="View details"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 hover:scale-110"
                      title="Delete service"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedServices.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 dark:text-gray-300 gap-4 sm:gap-0">
            <span>
              Showing {sortedServices.length} of {sortedServices.length}{" "}
              services
              {selectedServices.size > 0 &&
                ` (${selectedServices.size} selected)`}
            </span>
            <div className="flex items-center gap-4">
              <span>Rows per page: 50</span>
              <div className="flex gap-2">
                <button
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  disabled
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  disabled
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;
