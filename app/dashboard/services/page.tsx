"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Service } from "@/utils/interfaces";
import Controls from "@/components/dashboard/services/Controls";
import ServiceCard from "@/components/dashboard/services/ServiceCard";
import ServiceTable from "@/components/dashboard/services/ServiceTable";
import EmptyState from "@/components/dashboard/EmptyState";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { apiUtils } from "@/services/api.services";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaTools,
  FaCheckCircle,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import { serviceApiService } from "@/services/serviceApiService";

// StatsCards Component
const StatsCards: React.FC<{ services: Service[] }> = ({ services }) => {
  const stats = [
    {
      label: "Total Services",
      value: services.length,
      color: "from-blue-500 to-blue-600",
      icon: <FaTools className="text-white text-2xl" />,
    },
    {
      label: "Active",
      value: services.filter((s) => s.status === "active").length,
      color: "from-green-500 to-green-600",
      icon: <FaCheckCircle className="text-white text-2xl" />,
    },
    {
      label: "Total Clients",
      value: services.reduce((acc, s) => acc + s.clients, 0),
      color: "from-purple-500 to-purple-600",
      icon: <FaUsers className="text-white text-2xl" />,
    },
    {
      label: "Revenue",
      value: `$${services
        .reduce((sum, p) => sum + Number(p.price) * p.clients, 0)
        .toLocaleString()}`,
      color: "from-orange-500 to-orange-600",
      icon: <FaDollarSign className="text-white text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ServiceGrid Component
const ServiceGrid: React.FC<{
  services: Service[];
  selectedServices: Set<string>;
  onToggle: (id: string) => void;
  getTypeColor: (type: Service["type"]) => string;
  getStatusColor: (status: Service["status"]) => string;
}> = ({
  services,
  selectedServices,
  onToggle,
  getTypeColor,
  getStatusColor,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {services.map((service) => (
      <ServiceCard
        key={service.id}
        service={service}
        selectedServices={selectedServices}
        toggleServiceSelection={onToggle}
        getTypeColor={getTypeColor}
        getStatusColor={getStatusColor}
      />
    ))}
  </div>
);

// Main ServicesManagement Component
const Page: React.FC = () => {
  // Auth and data state
  const [authState, setAuthState] = useState<{
    isAuthorized: boolean | null;
    isCheckingAuth: boolean;
    authError: string | null;
  }>({
    isAuthorized: null,
    isCheckingAuth: true,
    authError: null,
  });

  const [services, setServices] = useState<Service[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [selectedTab, setSelectedTab] = useState<"all" | Service["type"]>(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<"all" | Service["status"]>(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set(),
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Service;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  // Notification helper
  const addNotification = useCallback(
    (message: string, type: "success" | "error") => {
      toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        toastId: Math.random().toString(36).substr(2, 9), // Unique ID for each toast
      });
    },
    [],
  );

  // Fetch services using the API service
  const fetchServices = useCallback(async () => {
    if (authState.isAuthorized === false) {
      setDataLoading(false);
      return;
    }

    try {
      setDataLoading(true);
      setError(null);

      const response = await serviceApiService.getServices({
        limit: 100,
        status: statusFilter === "all" ? undefined : statusFilter,
        type: selectedTab === "all" ? undefined : selectedTab,
      });

      if (apiUtils.isSuccess(response)) {
        const processedServices: Service[] = response.data.services.map(
          (service) => ({
            ...service,
            createdAt:
              typeof service.createdAt === "string"
                ? service.createdAt
                : new Date(service.createdAt).toISOString(),
            updatedAt:
              typeof service.updatedAt === "string"
                ? service.updatedAt
                : new Date(service.updatedAt).toISOString(),
          }),
        );

        setServices(processedServices);
      } else {
        const errorMessage = apiUtils.handleApiError(
          apiUtils.getErrorMessage(response),
        );
        setError(errorMessage);
        addNotification(errorMessage, "error");
      }
    } catch (error) {
      const errorMessage = "Failed to fetch services. Please try again.";
      setError(errorMessage);
      addNotification(errorMessage, "error");
      console.error("Error fetching services:", error);
    } finally {
      setDataLoading(false);
    }
  }, [authState.isAuthorized, statusFilter, selectedTab, addNotification]);

  // Fetch services when auth state changes or filters change
  useEffect(() => {
    if (authState.isAuthorized === true) {
      fetchServices();
    } else if (authState.isAuthorized === false) {
      setDataLoading(false);
    }
  }, [fetchServices, authState.isAuthorized]);

  // Check auth without redirecting
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/services?limit=1", {
          credentials: "include",
          method: "GET",
        });

        if (res.ok) {
          setAuthState({
            isAuthorized: true,
            isCheckingAuth: false,
            authError: null,
          });
        } else if (res.status === 401) {
          setAuthState({
            isAuthorized: false,
            isCheckingAuth: false,
            authError: "Not authenticated. Please log in.",
          });
        } else if (res.status === 403) {
          setAuthState({
            isAuthorized: false,
            isCheckingAuth: false,
            authError:
              "Access denied. Admin or Instructor privileges required.",
          });
        } else {
          setAuthState({
            isAuthorized: false,
            isCheckingAuth: false,
            authError: `Authentication check failed: ${res.status}`,
          });
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthState({
          isAuthorized: false,
          isCheckingAuth: false,
          authError: "Failed to check authentication status.",
        });
      }
    };

    checkAuth();
  }, []);

  // Filter services client-side (for search)
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      return matchesSearch;
    });
  }, [services, searchTerm]);

  // Sort services
  const sortedServices = useMemo(() => {
    if (!sortConfig) return filteredServices;

    return [...filteredServices].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      let comparison = 0;

      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (
        sortConfig.key === "createdAt" ||
        sortConfig.key === "updatedAt"
      ) {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        comparison = aDate.getTime() - bDate.getTime();
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredServices, sortConfig]);

  const handleSort = (key: keyof Service) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const toggleAllServices = () => {
    if (selectedServices.size === sortedServices.length) {
      setSelectedServices(new Set());
    } else {
      setSelectedServices(new Set(sortedServices.map((service) => service.id)));
    }
  };

  const getTypeColor = (type: Service["type"]) => {
    switch (type) {
      case "Education":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Mentorship":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "Development":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Writing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Hiring":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "Community":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      case "coming-soon":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Show loading state while checking authentication
  if (authState.isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

  // Show access denied without redirecting
  if (!authState.isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBriefcase className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {authState.authError ||
              "You don't have permission to access this page."}
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 mr-4"
          >
            Go to Login
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show error state without redirecting
  if (error && !dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBriefcase className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchServices}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main content - only shown when authorized
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Services Management"
          subtitle="Manage your educational, mentorship, development, and community services"
          buttonText="Create Service"
          location="/dashboard/services/new"
          buttonIcon={<FaBriefcase size={18} />}
        />
        <StatsCards services={services} />
        <Controls
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedServices={selectedServices}
        />

        {dataLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-600 dark:text-gray-300">
              Loading services...
            </div>
          </div>
        ) : sortedServices.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            title="No services found"
            subtitle={(term) =>
              term
                ? `No services match "${term}". Try adjusting your search or filters.`
                : "You haven't added any services yet. Start by creating a new service."
            }
            location="/dashboard/services/new"
            buttonText="Create Service"
            icon={<FaBriefcase className="w-8 h-8 text-gray-400" />}
          />
        ) : viewMode === "grid" ? (
          <ServiceGrid
            services={sortedServices}
            selectedServices={selectedServices}
            onToggle={toggleServiceSelection}
            getTypeColor={getTypeColor}
            getStatusColor={getStatusColor}
          />
        ) : (
          <ServiceTable
            sortedServices={sortedServices}
            selectedServices={selectedServices}
            toggleServiceSelection={toggleServiceSelection}
            toggleAllServices={toggleAllServices}
            handleSort={handleSort}
            sortConfig={sortConfig}
            getTypeColor={getTypeColor}
            getStatusColor={getStatusColor}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
