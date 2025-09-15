"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaBox,
  FaCheckCircle,
  FaPen,
  FaDollarSign,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Product } from "@/utils/interfaces";
import ProductCard from "@/components/dashboard/products/ProductCard";
import ProductTable from "@/components/dashboard/products/ProductTable";
import { productApiService, apiUtils } from "@/services/api.services";
import EmptyState from "@/components/dashboard/EmptyState";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { toast } from "react-toastify";
import ProductsControls from "@/components/dashboard/products/Controls";

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
      value: `$${products
        .reduce(
          (sum, p) => sum + Number(p.price) * (p.studentsEnrolled || 0),
          0,
        )
        .toLocaleString()}`,
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

// PaginationFooter Component
const PaginationFooter: React.FC<{
  currentPage: number;
  itemsPerPage: number;
  total: number;
  selectedCount: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, itemsPerPage, total, selectedCount, onPageChange }) => {
  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, total);
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 dark:text-gray-300 gap-4 sm:gap-0">
        <span>
          Showing {from}-{to} of {total} products
          {selectedCount > 0 && ` (${selectedCount} selected)`}
        </span>
        <div className="flex items-center gap-4">
          <span>Rows per page: {itemsPerPage}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProductGrid Component
const ProductGrid: React.FC<{
  products: Product[];
  selectedProducts: Set<string>;
  onToggle: (id: string) => void;
}> = ({ products, selectedProducts, onToggle }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
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

  // UI state
  const [typeFilter, setTypeFilter] = useState<"all" | Product["type"]>("all");
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
        toastId: Math.random().toString(36).substr(2, 9),
      });
    },
    [],
  );

  // Handle bulk status change
  const handleBulkStatusChange = useCallback(
    (productIds: string[], newStatus: Product["status"]) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          productIds.includes(product.id)
            ? { ...product, status: newStatus }
            : product,
        ),
      );
      setSelectedProducts(new Set()); // Clear selection after action
    },
    [],
  );

  // Handle bulk featured change
  const handleBulkFeaturedChange = useCallback(
    (productIds: string[], featured: boolean) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          productIds.includes(product.id) ? { ...product, featured } : product,
        ),
      );
      setSelectedProducts(new Set()); // Clear selection after action
    },
    [],
  );

  // Handle bulk delete
  const handleBulkDelete = useCallback((productIds: string[]) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => !productIds.includes(product.id)),
    );
    setSelectedProducts(new Set()); // Clear selection after action
  }, []);

  // Handle products update from API
  const handleProductsUpdate = useCallback((updatedProducts: Product[]) => {
    setProducts((prevProducts) => {
      const updatedMap = new Map(updatedProducts.map((p) => [p.id, p]));
      return prevProducts.map((product) =>
        updatedMap.has(product.id)
          ? {
              ...updatedMap.get(product.id)!,
              createdAt: product.createdAt
                ? new Date(product.createdAt)
                : new Date(),
              updatedAt: product.updatedAt
                ? new Date(product.updatedAt)
                : new Date(),
            }
          : product,
      );
    });
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
        type: typeFilter === "all" ? undefined : typeFilter,
      });

      if (apiUtils.isSuccess(response)) {
        const processedProducts: Product[] = response.data.products.map(
          (product) => ({
            ...product,
            createdAt: product.createdAt
              ? new Date(product.createdAt)
              : new Date(),
            updatedAt: product.updatedAt
              ? new Date(product.updatedAt)
              : new Date(),
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
  }, [authState.isAuthorized, statusFilter, typeFilter, addNotification]);

  // Fetch products when auth state changes or filters change
  useEffect(() => {
    if (authState.isAuthorized === true) {
      fetchProducts();
    } else if (authState.isAuthorized === false) {
      setDataLoading(false);
    }
  }, [fetchProducts, authState.isAuthorized]);

  // Check auth without redirecting
  useEffect(() => {
    const checkAuth = async () => {
      try {
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

  // Filter products client-side (for search)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.instructor.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
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

  // Paginate products
  const currentProducts = useMemo(() => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return sortedProducts.slice(indexOfFirst, indexOfLast);
  }, [sortedProducts, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, statusFilter]);

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

  const toggleAllProducts = useCallback(() => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      const allCurrentSelected = currentProducts.every((p) => newSet.has(p.id));
      if (allCurrentSelected) {
        currentProducts.forEach((p) => newSet.delete(p.id));
      } else {
        currentProducts.forEach((p) => newSet.add(p.id));
      }
      return newSet;
    });
  }, [currentProducts]);

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
      case "Ebook":
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
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="w-8 h-8 text-red-600 dark:text-red-400" />
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="w-8 h-8 text-red-600 dark:text-red-400" />
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
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Products Management"
          subtitle="Manage your courses, bootcamps, eBooks, and codebases"
          buttonText="Create Product"
          location="/dashboard/products/new"
          buttonIcon={<FaPlus size={18} />}
        />
        <StatsCards products={products} />
        <ProductsControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedProducts={selectedProducts}
          onBulkStatusChange={handleBulkStatusChange}
          onBulkFeaturedChange={handleBulkFeaturedChange}
          onBulkDelete={handleBulkDelete}
          onProductsUpdate={handleProductsUpdate}
        />

        {dataLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-600 dark:text-gray-300">
              Loading products...
            </div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            title="No product found"
            subtitle={(term) =>
              term
                ? `No products match "${term}". Try adjusting your search or filters.`
                : "You haven't added any products yet. Start by creating a new product."
            }
            location="/dashboard/products/new"
            buttonText="Create Product"
            icon={<FaBox className="w-8 h-8 text-gray-400" />}
          />
        ) : viewMode === "grid" ? (
          <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
            <ProductGrid
              products={currentProducts}
              selectedProducts={selectedProducts}
              onToggle={toggleProductSelection}
            />
            {sortedProducts.length > 0 && (
              <PaginationFooter
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                total={sortedProducts.length}
                selectedCount={selectedProducts.size}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        ) : (
          <ProductTable
            products={currentProducts}
            totalProducts={sortedProducts.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            selectedProducts={selectedProducts}
            onToggle={toggleProductSelection}
            toggleAll={toggleAllProducts}
            sortConfig={sortConfig}
            onSort={handleSort}
            getStatusColor={getStatusColor}
            getTypeColor={getTypeColor}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
