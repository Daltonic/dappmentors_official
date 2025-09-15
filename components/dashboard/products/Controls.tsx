"use client";

import { Product, ProductType } from "@/utils/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaTh,
  FaListUl,
  FaCog,
  FaStar,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useApiState } from "@/services/api.services";
import {
  BulkProductUpdateResponse,
  BulkProductDeleteResponse,
  productApiService,
} from "@/services/productApiService";
import { toast } from "react-toastify";

// Props interface for the Products Controls component
interface ProductsControlsProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: "all" | Product["status"];
  setStatusFilter: React.Dispatch<
    React.SetStateAction<"all" | Product["status"]>
  >;
  typeFilter: "all" | ProductType;
  setTypeFilter: React.Dispatch<React.SetStateAction<"all" | ProductType>>;
  viewMode: "grid" | "table";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "table">>;
  selectedProducts: Set<string>;
  onBulkStatusChange?: (
    productIds: string[],
    newStatus: Product["status"],
  ) => void;
  onBulkFeaturedChange?: (productIds: string[], featured: boolean) => void;
  onBulkDelete?: (productIds: string[]) => void;
  onProductsUpdate?: (products: Product[]) => void;
}

// Products Controls Component
const ProductsControls: React.FC<ProductsControlsProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  viewMode,
  setViewMode,
  selectedProducts,
  onBulkStatusChange,
  onBulkFeaturedChange,
  onBulkDelete,
  onProductsUpdate,
}) => {
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isFeaturedMenuOpen, setIsFeaturedMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // API states for different bulk operations
  const statusApi = useApiState<BulkProductUpdateResponse>();
  const featuredApi = useApiState<BulkProductUpdateResponse>();
  const deleteApi = useApiState<BulkProductDeleteResponse>();

  // Refs for dropdown menus
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const featuredMenuRef = useRef<HTMLDivElement>(null);
  const featuredButtonRef = useRef<HTMLButtonElement>(null);
  const deleteMenuRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // Define available status change actions for bulk operations
  const getBulkStatusActions = () => {
    const availableStatuses: Array<NonNullable<Product["status"]>> = [
      "published",
      "draft",
      "archived",
    ];

    return availableStatuses.map((status) => ({
      label: `Set to ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      status: status,
    }));
  };

  // Define available featured toggle actions
  const getBulkFeaturedActions = () => [
    { label: "Mark as Featured", featured: true },
    { label: "Remove Featured", featured: false },
  ];

  const statusActions = getBulkStatusActions();
  const featuredActions = getBulkFeaturedActions();

  // Handle bulk status change with API integration
  const handleBulkStatusChange = async (newStatus: Product["status"]) => {
    const selectedProductIds = Array.from(selectedProducts);

    if (selectedProductIds.length === 0) {
      toast.error("No products selected");
      return;
    }

    setIsStatusMenuOpen(false);

    await statusApi.execute(
      () => productApiService.bulkUpdateStatus(selectedProductIds, newStatus),
      (data) => {
        toast.success(data.message || "Product statuses updated successfully");

        // Update the parent component with new product data
        if (data.products && onProductsUpdate) {
          onProductsUpdate(data.products);
        }

        // Call the original callback if provided
        if (onBulkStatusChange) {
          onBulkStatusChange(selectedProductIds, newStatus);
        }

        console.log(
          `Successfully changed status for ${selectedProductIds.length} products to ${newStatus}`,
        );
      },
      (errorMessage) => {
        toast.error(errorMessage);
        console.error("Bulk status change failed:", errorMessage);
      },
    );
  };

  // Handle bulk featured change with API integration
  const handleBulkFeaturedChange = async (featured: boolean) => {
    const selectedProductIds = Array.from(selectedProducts);

    if (selectedProductIds.length === 0) {
      toast.error("No products selected");
      return;
    }

    setIsFeaturedMenuOpen(false);

    await featuredApi.execute(
      () => productApiService.bulkUpdateFeatured(selectedProductIds, featured),
      (data) => {
        toast.success(
          data.message ||
            `Products ${featured ? "featured" : "unfeatured"} successfully`,
        );

        // Update the parent component with new product data
        if (data.products && onProductsUpdate) {
          onProductsUpdate(data.products);
        }

        // Call the original callback if provided
        if (onBulkFeaturedChange) {
          onBulkFeaturedChange(selectedProductIds, featured);
        }

        console.log(
          `Successfully ${featured ? "featured" : "unfeatured"} ${selectedProductIds.length} products`,
        );
      },
      (errorMessage) => {
        toast.error(errorMessage);
        console.error("Bulk featured change failed:", errorMessage);
      },
    );
  };

  // Handle bulk delete with API integration
  const handleBulkDelete = async () => {
    const selectedProductIds = Array.from(selectedProducts);

    if (selectedProductIds.length === 0) {
      toast.error("No products selected");
      return;
    }

    setIsDeleteConfirmOpen(false);

    await deleteApi.execute(
      () => productApiService.bulkDeleteProducts(selectedProductIds),
      (data) => {
        toast.success(data.message || "Products deleted successfully");

        // Call the original callback if provided
        if (onBulkDelete) {
          onBulkDelete(selectedProductIds);
        }

        console.log(`Successfully deleted ${data.deletedCount} products`);
      },
      (errorMessage) => {
        toast.error(errorMessage);
        console.error("Bulk delete failed:", errorMessage);
      },
    );
  };

  // Close dropdown menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Status menu
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target as Node) &&
        statusButtonRef.current &&
        !statusButtonRef.current.contains(event.target as Node)
      ) {
        setIsStatusMenuOpen(false);
      }

      // Featured menu
      if (
        featuredMenuRef.current &&
        !featuredMenuRef.current.contains(event.target as Node) &&
        featuredButtonRef.current &&
        !featuredButtonRef.current.contains(event.target as Node)
      ) {
        setIsFeaturedMenuOpen(false);
      }

      // Delete menu
      if (
        deleteMenuRef.current &&
        !deleteMenuRef.current.contains(event.target as Node) &&
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target as Node)
      ) {
        setIsDeleteConfirmOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8 shadow-lg">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as "all" | ProductType)
            }
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-xs sm:text-sm"
          >
            <option value="all">All Types</option>
            <option value="Course">Course</option>
            <option value="Bootcamp">Bootcamp</option>
            <option value="Ebook">Ebook</option>
            <option value="Codebase">Codebase</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | Product["status"])
            }
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-xs sm:text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
            >
              <FaTh className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                viewMode === "table"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
            >
              <FaListUl className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.size > 0 && (
          <div className="flex flex-wrap gap-2">
            {/* Status Change Dropdown */}
            <div className="relative">
              <button
                ref={statusButtonRef}
                disabled={statusApi.loading}
                className={`bg-gradient-to-r from-blue-900/30 to-blue-900/60 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                  statusApi.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={() =>
                  !statusApi.loading && setIsStatusMenuOpen(!isStatusMenuOpen)
                }
              >
                {statusApi.loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaCog className="w-4 h-4" />
                )}
                Status ({selectedProducts.size})
              </button>

              {isStatusMenuOpen && !statusApi.loading && (
                <motion.div
                  ref={statusMenuRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[200px]"
                >
                  {statusActions.length > 0 ? (
                    statusActions.map((action) => (
                      <button
                        key={action.status}
                        onClick={() => handleBulkStatusChange(action.status)}
                        className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        {action.label}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                      No status changes available
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Featured Toggle Dropdown */}
            <div className="relative">
              <button
                ref={featuredButtonRef}
                disabled={featuredApi.loading}
                className={`bg-gradient-to-r from-yellow-900/30 to-yellow-900/60 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                  featuredApi.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={() =>
                  !featuredApi.loading &&
                  setIsFeaturedMenuOpen(!isFeaturedMenuOpen)
                }
              >
                {featuredApi.loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaStar className="w-4 h-4" />
                )}
                Featured ({selectedProducts.size})
              </button>

              {isFeaturedMenuOpen && !featuredApi.loading && (
                <motion.div
                  ref={featuredMenuRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[200px]"
                >
                  {featuredActions.map((action) => (
                    <button
                      key={action.featured.toString()}
                      onClick={() => handleBulkFeaturedChange(action.featured)}
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Delete Products Dropdown */}
            <div className="relative">
              <button
                ref={deleteButtonRef}
                disabled={deleteApi.loading}
                className={`bg-gradient-to-r from-red-900/30 to-red-900/60 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                  deleteApi.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={() =>
                  !deleteApi.loading &&
                  setIsDeleteConfirmOpen(!isDeleteConfirmOpen)
                }
              >
                {deleteApi.loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaTrash className="w-4 h-4" />
                )}
                Delete ({selectedProducts.size})
              </button>

              {isDeleteConfirmOpen && !deleteApi.loading && (
                <motion.div
                  ref={deleteMenuRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[250px] p-4"
                >
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Are you sure you want to delete {selectedProducts.size}{" "}
                    product{selectedProducts.size > 1 ? "s" : ""}?
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsDeleteConfirmOpen(false)}
                      className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsControls;
