"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaBox, FaCheckCircle, FaPen, FaDollarSign } from "react-icons/fa";
import { Product } from "@/utils/interfaces";
import ProductCard from "@/components/dashboard/products/ProductCard";
import ProductTable from "@/components/dashboard/products/ProductTable";
import Controls from "@/components/dashboard/products/Controls";
import Link from "next/link";
import { productApiService, apiUtils } from "@/services/api.services";
import EmptyState from "@/components/dashboard/EmptyState"; // Assuming this exists or reuse from users if shared

// Notification component type
interface Notification {
  id: string;
  message: string;
  type: "success" | "error";
}

// Header Component
const Header: React.FC = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-2">
        Product Management
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Manage your courses, bootcamps, eBooks, and codebases
      </p>
    </div>
    <Link
      href="/dashboard/products/new"
      className="relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group"
    >
      <span className="relative z-10 flex items-center gap-2">
        Create Product
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </span>
      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Link>
  </div>
);

// StatsCards Component
const StatsCards: React.FC<{ products: Product[] }> = ({ products }) => {
  const stats = [
    {
      label: "Total Products",
      value: products.length,
      color: "from-blue-500 to-blue-600",
      icon: <FaBox className="text-white text-2xl" />,
    },
    {
      label: "Published",
      value: products.filter((p) => p.status === "published").length,
      color: "from-green-500 to-green-600",
      icon: <FaCheckCircle className="text-white text-2xl" />,
    },
    {
      label: "Drafts",
      value: products.filter((p) => p.status === "draft").length,
      color: "from-yellow-500 to-yellow-600",
      icon: <FaPen className="text-white text-2xl" />,
    },
    {
      label: "Total Revenue",
      value: `$${products.reduce((sum, p) => sum + p.price * p.enrollments, 0).toLocaleString()}`,
      color: "from-purple-500 to-purple-600",
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

// ProductGrid Component
const ProductGrid: React.FC<{
  products: Product[];
  selectedProducts: Set<string>;
  onToggle: (id: string) => void;
}> = ({ products, selectedProducts, onToggle }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        selected={selectedProducts.has(product.id)}
        onToggle={() => onToggle(product.id)}
      />
    ))}
  </div>
);

// Notifications Component
const Notifications: React.FC<{
  notifications: Notification[];
  onRemove: (id: string) => void;
}> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={`px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] max-w-[500px] ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span className="text-sm flex-1">{notification.message}</span>
          <button
            onClick={() => onRemove(notification.id)}
            className="ml-3 text-white hover:text-gray-200 font-bold text-lg"
          >
            ×
          </button>
        </motion.div>
      ))}
    </div>
  );
};

// Main Page Component
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

  const [products, setProducts] = useState<Product[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // UI state
  const [selectedTab, setSelectedTab] = useState<"all" | Product["type"]>(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<"all" | Product["status"]>(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(),
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  // Notification helper
  const addNotification = useCallback(
    (message: string, type: "success" | "error") => {
      const id = Math.random().toString(36).substr(2, 9);
      const notification: Notification = { id, message, type };

      setNotifications((prev) => [...prev, notification]);

      // Auto remove after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);
    },
    [],
  );

  // Remove notification manually
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Check auth without redirecting
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First, try to fetch products - if successful, user is authorized
        const res = await fetch("/api/products?limit=1", {
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
            authError: "Access denied. Admin privileges required.",
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

  // Fetch products using the API service
  const fetchProducts = useCallback(async () => {
    if (authState.isAuthorized === false) {
      setDataLoading(false);
      return;
    }

    try {
      setDataLoading(true);
      setError(null);

      const response = await productApiService.getProducts({
        limit: 100,
        status: statusFilter === "all" ? undefined : statusFilter,
        type: selectedTab === "all" ? undefined : selectedTab,
      });

      if (apiUtils.isSuccess(response)) {
        const processedProducts: Product[] = response.data.products.map(
          (product) => ({
            ...product,
            createdAt: new Date(product.createdAt), // Keep as Date object
            updatedAt: new Date(product.updatedAt), // Keep as Date object
          }),
        );

        setProducts(processedProducts);
      } else {
        const errorMessage = apiUtils.handleApiError(
          apiUtils.getErrorMessage(response),
        );
        setError(errorMessage);
        addNotification(errorMessage, "error");
      }
    } catch (error) {
      const errorMessage = "Failed to fetch products. Please try again.";
      setError(errorMessage);
      addNotification(errorMessage, "error");
      console.error("Error fetching products:", error);
    } finally {
      setDataLoading(false);
    }
  }, [authState.isAuthorized, statusFilter, selectedTab, addNotification]);

  // Fetch products when auth state changes or filters change
  useEffect(() => {
    if (authState.isAuthorized === true) {
      fetchProducts();
    } else if (authState.isAuthorized === false) {
      setDataLoading(false);
    }
  }, [fetchProducts, authState.isAuthorized]);

  // Filter products client-side (for search)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [products, searchTerm]);

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!sortConfig) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      let comparison = 0;

      if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredProducts, sortConfig]);

  const handleSort = (key: keyof Product) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const toggleAllProducts = () => {
    if (selectedProducts.size === sortedProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(sortedProducts.map((product) => product.id)));
    }
  };

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: Product["type"]) => {
    switch (type) {
      case "Course":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Bootcamp":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "eBook":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Codebase":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
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
            <FaBox className="w-8 h-8 text-red-600 dark:text-red-400" />{" "}
            {/* Adapted icon */}
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
            <FaBox className="w-8 h-8 text-red-600 dark:text-red-400" />{" "}
            {/* Adapted icon */}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Products
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
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
        {/* Notifications */}
        <Notifications
          notifications={notifications}
          onRemove={removeNotification}
        />

        <Header />
        <StatsCards products={products} />
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedProducts={selectedProducts}
        />

        {dataLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-600 dark:text-gray-300">
              Loading products...
            </div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <EmptyState searchTerm={searchTerm} />
        ) : viewMode === "grid" ? (
          <ProductGrid
            products={sortedProducts}
            selectedProducts={selectedProducts}
            onToggle={toggleProductSelection}
          />
        ) : (
          <ProductTable
            products={sortedProducts}
            selectedProducts={selectedProducts}
            onToggle={toggleProductSelection}
            toggleAll={toggleAllProducts}
            sortConfig={sortConfig}
            onSort={handleSort}
            allProductsLength={products.length}
            getStatusColor={getStatusColor}
            getTypeColor={getTypeColor}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
