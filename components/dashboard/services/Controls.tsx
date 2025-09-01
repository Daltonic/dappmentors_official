import { Service } from "@/utils/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaTh,
  FaListUl,
  FaCog,
  FaStar,
  FaSpinner,
  FaTrash,
  FaLayerGroup,
  FaExchangeAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useApiState } from "@/services/api.services";
import {
  BulkServiceUpdateResponse,
  BulkServiceDeleteResponse,
  serviceApiService,
} from "@/services/serviceApiService";
import { toast } from "react-toastify";

// Props interface for the Services Controls component
interface ServicesControlsProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: "all" | Service["type"];
  setSelectedTab: React.Dispatch<React.SetStateAction<"all" | Service["type"]>>;
  statusFilter: "all" | Service["status"];
  setStatusFilter: React.Dispatch<
    React.SetStateAction<"all" | Service["status"]>
  >;
  viewMode: "grid" | "table";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "table">>;
  selectedServices: Set<string>;
  uniqueCategories?: string[];
  categoryFilter?: "all" | string;
  setCategoryFilter?: React.Dispatch<React.SetStateAction<"all" | string>>;
  onBulkStatusChange?: (
    serviceIds: string[],
    newStatus: Service["status"],
  ) => void;
  onBulkFeaturedChange?: (serviceIds: string[], featured: boolean) => void;
  onBulkCategoryChange?: (serviceIds: string[], category: string) => void;
  onBulkTypeChange?: (serviceIds: string[], type: Service["type"]) => void;
  onBulkDelete?: (serviceIds: string[]) => void;
  onServicesUpdate?: (services: Service[]) => void; // Callback to update parent component's service list
}

// Services Controls Component
const ServicesControls: React.FC<ServicesControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTab,
  setSelectedTab,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  selectedServices,
  uniqueCategories = [],
  categoryFilter = "all",
  setCategoryFilter,
  onBulkStatusChange,
  onBulkFeaturedChange,
  onBulkCategoryChange,
  onBulkTypeChange,
  onBulkDelete,
  onServicesUpdate,
}) => {
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isFeaturedMenuOpen, setIsFeaturedMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // API states for different bulk operations
  const statusApi = useApiState<BulkServiceUpdateResponse>();
  const featuredApi = useApiState<BulkServiceUpdateResponse>();
  const categoryApi = useApiState<BulkServiceUpdateResponse>();
  const typeApi = useApiState<BulkServiceUpdateResponse>();
  const deleteApi = useApiState<BulkServiceDeleteResponse>();

  // Refs for dropdown menus
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const featuredMenuRef = useRef<HTMLDivElement>(null);
  const featuredButtonRef = useRef<HTMLButtonElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);
  const typeMenuRef = useRef<HTMLDivElement>(null);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const deleteMenuRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // Service types available
  const serviceTypes: Service["type"][] = [
    "Education",
    "Mentorship",
    "Development",
    "Writing",
    "Hiring",
    "Community",
  ];

  // Tab options with "all" included
  const tabOptions = ["all", ...serviceTypes] as const;

  // Define available status change actions for bulk operations
  const getBulkStatusActions = () => {
    const availableStatuses: Service["status"][] = [
      "active",
      "inactive",
      "coming-soon",
    ];
    return availableStatuses.map((status) => ({
      label: `Set to ${status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}`,
      status: status,
    }));
  };

  // Define available featured toggle actions
  const getBulkFeaturedActions = () => [
    { label: "Mark as Featured", featured: true },
    { label: "Remove Featured", featured: false },
  ];

  // Define available category change actions
  const getBulkCategoryActions = () => {
    return uniqueCategories.map((category) => ({
      label: `Set to ${category}`,
      category: category,
    }));
  };

  // Define available type change actions
  const getBulkTypeActions = () => {
    return serviceTypes.map((type) => ({
      label: `Set to ${type}`,
      type: type,
    }));
  };

  const statusActions = getBulkStatusActions();
  const featuredActions = getBulkFeaturedActions();
  const categoryActions = getBulkCategoryActions();
  const typeActions = getBulkTypeActions();

  // Handle bulk status change with API integration
  const handleBulkStatusChange = async (newStatus: Service["status"]) => {
    const selectedServiceIds = Array.from(selectedServices);

    if (selectedServiceIds.length === 0) {
      toast.error("No services selected");
      return;
    }

    setIsStatusMenuOpen(false);

    await statusApi.execute(
      () => serviceApiService.bulkUpdateStatus(selectedServiceIds, newStatus),
      (data) => {
        toast.success(data.message || "Service statuses updated successfully");

        // Update the parent component with new service data
        if (data.services && onServicesUpdate) {
          onServicesUpdate(data.services);
        }

        // Call the original callback if provided (for backward compatibility)
        if (onBulkStatusChange) {
          onBulkStatusChange(selectedServiceIds, newStatus);
        }

        console.log(
          `Successfully changed status for ${selectedServiceIds.length} services to ${newStatus}`,
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
    const selectedServiceIds = Array.from(selectedServices);

    if (selectedServiceIds.length === 0) {
      toast.error("No services selected");
      return;
    }

    setIsFeaturedMenuOpen(false);

    await featuredApi.execute(
      () => serviceApiService.bulkUpdateFeatured(selectedServiceIds, featured),
      (data) => {
        toast.success(
          data.message ||
            `Services ${featured ? "featured" : "unfeatured"} successfully`,
        );

        // Update the parent component with new service data
        if (data.services && onServicesUpdate) {
          onServicesUpdate(data.services);
        }

        // Call the original callback if provided (for backward compatibility)
        if (onBulkFeaturedChange) {
          onBulkFeaturedChange(selectedServiceIds, featured);
        }

        console.log(
          `Successfully ${featured ? "featured" : "unfeatured"} ${selectedServiceIds.length} services`,
        );
      },
      (errorMessage) => {
        toast.error(errorMessage);
        console.error("Bulk featured change failed:", errorMessage);
      },
    );
  };

  // Handle bulk category change with API integration
  const handleBulkCategoryChange = async (newCategory: string) => {
    const selectedServiceIds = Array.from(selectedServices);

    if (selectedServiceIds.length === 0) {
      toast.error("No services selected");
      return;
    }

    setIsCategoryMenuOpen(false);

    await categoryApi.execute(
      () =>
        serviceApiService.bulkUpdateCategory(selectedServiceIds, newCategory),
      (data) => {
        toast.success(
          data.message || "Service categories updated successfully",
        );

        // Update the parent component with new service data
        if (data.services && onServicesUpdate) {
          onServicesUpdate(data.services);
        }

        // Call the original callback if provided (for backward compatibility)
        if (onBulkCategoryChange) {
          onBulkCategoryChange(selectedServiceIds, newCategory);
        }

        console.log(
          `Successfully changed category for ${selectedServiceIds.length} services to ${newCategory}`,
        );
      },
      (errorMessage) => {
        toast.error(errorMessage);
        console.error("Bulk category change failed:", errorMessage);
      },
    );
  };

  // Handle bulk type change with API integration
  const handleBulkTypeChange = async (newType: Service["type"]) => {
    const selectedServiceIds = Array.from(selectedServices);

    if (selectedServiceIds.length === 0) {
      toast.error("No services selected");
      return;
    }

    setIsTypeMenuOpen(false);

    await typeApi.execute(
      () => serviceApiService.bulkUpdateType(selectedServiceIds, newType),
      (data) => {
        toast.success(data.message || "Service types updated successfully");

        // Update the parent component with new service data
        if (data.services && onServicesUpdate) {
          onServicesUpdate(data.services);
        }

        // Call the original callback if provided (for backward compatibility)
        if (onBulkTypeChange) {
          onBulkTypeChange(selectedServiceIds, newType);
        }

        console.log(
          `Successfully changed type for ${selectedServiceIds.length} services to ${newType}`,
        );
      },
      (errorMessage) => {
        toast.error(errorMessage);
        console.error("Bulk type change failed:", errorMessage);
      },
    );
  };

  // Handle bulk delete with API integration
  const handleBulkDelete = async () => {
    const selectedServiceIds = Array.from(selectedServices);

    if (selectedServiceIds.length === 0) {
      toast.error("No services selected");
      return;
    }

    setIsDeleteConfirmOpen(false);

    await deleteApi.execute(
      () => serviceApiService.bulkDeleteServices(selectedServiceIds),
      (data) => {
        toast.success(data.message || "Services deleted successfully");

        // Call the original callback if provided
        if (onBulkDelete) {
          onBulkDelete(selectedServiceIds);
        }

        console.log(`Successfully deleted ${data.deletedCount} services`);
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

      // Category menu
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node) &&
        categoryButtonRef.current &&
        !categoryButtonRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }

      // Type menu
      if (
        typeMenuRef.current &&
        !typeMenuRef.current.contains(event.target as Node) &&
        typeButtonRef.current &&
        !typeButtonRef.current.contains(event.target as Node)
      ) {
        setIsTypeMenuOpen(false);
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
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          {/* Type Filter (Tabs) */}
          <div className="flex flex-wrap gap-2">
            {tabOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-semibold transition-all duration-300 capitalize text-xs sm:text-sm ${
                  selectedTab === tab
                    ? "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#D2145A]/10 hover:to-[#FF4081]/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | Service["status"])
              }
              className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-xs sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="coming-soon">Coming Soon</option>
            </select>

            {/* Category Filter (if categories are available) */}
            {setCategoryFilter && uniqueCategories.length > 0 && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-xs sm:text-sm"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </div>

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
        {selectedServices.size > 0 && (
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
                Status ({selectedServices.size})
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
                Featured ({selectedServices.size})
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

            {/* Category Change Dropdown (if categories available) */}
            {uniqueCategories.length > 0 && (
              <div className="relative">
                <button
                  ref={categoryButtonRef}
                  disabled={categoryApi.loading}
                  className={`bg-gradient-to-r from-purple-900/30 to-purple-900/60 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[150px] ${
                    categoryApi.loading
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                  onClick={() =>
                    !categoryApi.loading &&
                    setIsCategoryMenuOpen(!isCategoryMenuOpen)
                  }
                >
                  {categoryApi.loading ? (
                    <FaSpinner className="w-4 h-4 animate-spin" />
                  ) : (
                    <FaLayerGroup className="w-4 h-4" />
                  )}
                  Category ({selectedServices.size})
                </button>

                {isCategoryMenuOpen && !categoryApi.loading && (
                  <motion.div
                    ref={categoryMenuRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[200px]"
                  >
                    {categoryActions.length > 0 ? (
                      categoryActions.map((action) => (
                        <button
                          key={action.category}
                          onClick={() =>
                            handleBulkCategoryChange(action.category)
                          }
                          className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                        >
                          {action.label}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        No categories available
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {/* Type Change Dropdown */}
            <div className="relative">
              <button
                ref={typeButtonRef}
                disabled={typeApi.loading}
                className={`bg-gradient-to-r from-green-900/30 to-green-900/60 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[130px] ${
                  typeApi.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={() =>
                  !typeApi.loading && setIsTypeMenuOpen(!isTypeMenuOpen)
                }
              >
                {typeApi.loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaExchangeAlt className="w-4 h-4" />
                )}
                Type ({selectedServices.size})
              </button>

              {isTypeMenuOpen && !typeApi.loading && (
                <motion.div
                  ref={typeMenuRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[200px]"
                >
                  {typeActions.map((action) => (
                    <button
                      key={action.type}
                      onClick={() => handleBulkTypeChange(action.type)}
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Delete Services Dropdown */}
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
                Delete ({selectedServices.size})
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
                    Are you sure you want to delete {selectedServices.size}{" "}
                    service{selectedServices.size > 1 ? "s" : ""}?
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

export default ServicesControls;
