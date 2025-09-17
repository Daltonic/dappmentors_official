import { Product, Service } from "@/utils/interfaces";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";

// Lessons Content Component
interface PurchaseFeedProps {
  products: Product[];
  services: Service[];
}

// PurchaseFeed Component
const PurchaseFeed: React.FC<PurchaseFeedProps> = ({ products, services }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: "title" | "updatedAt" | "type";
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Time ago function
  const timeAgo = (date: Date): string => {
    const now = new Date(2025, 8, 17); // September 17, 2025
    const delta = now.getTime() - date.getTime();
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months === 1) return "1 month ago";
    return `${months} months ago`;
  };

  // Normalize date
  const normalizeDate = (date: Date | string | undefined): Date => {
    if (!date) return new Date();
    return typeof date === "string" ? new Date(date) : date;
  };

  // Combine products and services
  const allPurchases = useMemo(
    () => [
      ...products.map((p) => ({
        ...p,
        kind: "product" as const,
        updatedAt: normalizeDate(p.updatedAt),
      })),
      ...services.map((s) => ({
        ...s,
        kind: "service" as const,
        updatedAt: normalizeDate(s.updatedAt),
      })),
    ],
    [],
  );

  // Filter purchases
  const filteredPurchases = useMemo(() => {
    return allPurchases.filter(
      (purchase) =>
        purchase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (purchase.kind === "product" &&
          purchase.instructor.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())),
    );
  }, [allPurchases, searchTerm]);

  // Sort purchases
  const sortedPurchases = useMemo(() => {
    if (!sortConfig) return filteredPurchases;
    return [...filteredPurchases].sort((a, b) => {
      if (sortConfig.key === "title") {
        const aValue = a.title;
        const bValue = b.title;
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (sortConfig.key === "type") {
        const aValue = a.kind === "product" ? a.type : a.type; // Assuming service also has a 'type' property
        const bValue = b.kind === "product" ? b.type : b.type;
        // Handle cases where type might be undefined or null
        if (!aValue || !bValue) return 0;
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        const aValue = a.updatedAt.getTime();
        const bValue = b.updatedAt.getTime();
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
    });
  }, [filteredPurchases, sortConfig]);

  // Paginate purchases
  const paginatedPurchases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedPurchases.slice(start, end);
  }, [sortedPurchases, currentPage]);

  const totalPages = Math.ceil(sortedPurchases.length / itemsPerPage);

  // Handle sort
  const handleSort = (key: "title" | "updatedAt" | "type") => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1); // Reset to first page on sort
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Sort icon component
  const SortIcon: React.FC<{
    column: "title" | "updatedAt" | "type" | "status";
  }> = ({ column }) => {
    if (!sortConfig || sortConfig.key !== column) {
      return <FaSort className="w-4 h-4 opacity-30" />;
    }
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="w-4 h-4 text-[#D2145A]" />
    ) : (
      <FaSortDown className="w-4 h-4 text-[#D2145A]" />
    );
  };

  // Map to activities
  const activities = paginatedPurchases.map((purchase) => ({
    id: purchase.id,
    icon: purchase.kind === "product" ? "📚" : "🛠️",
    title: `Purchased ${purchase.title}`,
    description:
      purchase.kind === "product"
        ? `${purchase.type} - ${purchase.description} by ${purchase.instructor.name}${purchase.featured ? " (Featured)" : ""}`
        : `${purchase.type} - ${purchase.description}${purchase.featured ? " (Featured)" : ""}`,
    time: timeAgo(purchase.updatedAt),
    color: purchase.kind === "product" ? "text-blue-500" : "text-green-500",
    type: purchase.kind === "product" ? "product" : "service",
  }));

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-xl font-cambo font-normal text-gray-900 dark:text-white">
          Recent Purchases
        </h3>
      </div>
      <div className="p-6">
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search purchases..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full pl-8 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleSort("title")}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl flex items-center gap-2 text-sm hover:bg-[#FF4081]/20 transition-colors"
            >
              Title <SortIcon column="title" />
            </button>
            <button
              onClick={() => handleSort("updatedAt")}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl flex items-center gap-2 text-sm hover:bg-[#FF4081]/20 transition-colors"
            >
              Date <SortIcon column="updatedAt" />
            </button>
            <button
              onClick={() => handleSort("type")}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl flex items-center gap-2 text-sm hover:bg-[#FF4081]/20 transition-colors"
            >
              Type <SortIcon column="type" />
            </button>
          </div>
        </div>
        {/* Purchase List */}
        {activities.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 py-8">
            No purchases found matching your search.
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FF4081]/10 dark:hover:bg-[#FF4081]/20 transition-colors duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                    activity.color === "text-blue-500"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "bg-green-100 dark:bg-green-900/30"
                  }`}
                >
                  {activity.icon}
                </div>
                <Link
                  href={`/dashboard/purchases/${activity.id}/lessons`}
                  onClick={
                    activity.type === "service"
                      ? (e) => e.preventDefault()
                      : undefined
                  }
                  className="flex-1"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, sortedPurchases.length)} of{" "}
              {sortedPurchases.length} purchases
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-[#FF4081] text-white"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-[#FF4081]/20"
                    } transition-colors`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseFeed;
