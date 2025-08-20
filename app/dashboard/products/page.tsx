"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaBox, FaCheckCircle, FaPen, FaDollarSign } from "react-icons/fa";
import { Product } from "@/utils/interfaces";
import ProductCard from "@/components/dashboard/products/ProductCard";
import ProductTable from "@/components/dashboard/products/ProductTable";
import CreateProductModal from "@/components/dashboard/products/CreateProductModal";
import Controls from "@/components/dashboard/products/Controls";

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Complete Solidity Smart Contract Development",
    description:
      "Master smart contract development with comprehensive hands-on projects",
    type: "Course",
    price: 299,
    status: "published",
    category: "Blockchain Development",
    difficulty: "Intermediate",
    duration: "12 weeks",
    enrollments: 1247,
    rating: 4.8,
    totalReviews: 234,
    instructor: "Darlington Gospel",
    createdAt: "2024-01-15",
    updatedAt: "2024-08-10",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop",
  },
  {
    id: "2",
    title: "Solana Web3 Development Bootcamp",
    description:
      "Intensive 8-week bootcamp covering Rust, Anchor framework, and dApp development",
    type: "Bootcamp",
    price: 1299,
    status: "published",
    category: "Web3 Development",
    difficulty: "Advanced",
    duration: "8 weeks",
    enrollments: 432,
    rating: 4.9,
    totalReviews: 89,
    instructor: "Darlington Gospel",
    createdAt: "2024-02-20",
    updatedAt: "2024-08-15",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=400&h=240&fit=crop",
  },
  {
    id: "3",
    title: "The Complete Guide to DeFi Development",
    description:
      "Comprehensive eBook covering DeFi protocols, yield farming, and liquidity pools",
    type: "eBook",
    price: 49,
    status: "published",
    category: "DeFi",
    difficulty: "Intermediate",
    duration: "320 pages",
    enrollments: 2156,
    rating: 4.7,
    totalReviews: 445,
    instructor: "Darlington Gospel",
    createdAt: "2024-03-10",
    updatedAt: "2024-07-25",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=400&h=240&fit=crop",
  },
  {
    id: "4",
    title: "NFT Marketplace Codebase",
    description:
      "Production-ready NFT marketplace with minting, trading, and auction features",
    type: "Codebase",
    price: 249,
    status: "draft",
    category: "NFT Development",
    difficulty: "Advanced",
    duration: "Full Stack",
    enrollments: 156,
    rating: 4.6,
    totalReviews: 32,
    instructor: "Darlington Gospel",
    createdAt: "2024-04-05",
    updatedAt: "2024-08-18",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=240&fit=crop",
  },
  {
    id: "5",
    title: "React & Web3 Integration Masterclass",
    description:
      "Learn to build modern dApps with React, Web3.js, and MetaMask integration",
    type: "Course",
    price: 199,
    status: "published",
    category: "Frontend Development",
    difficulty: "Beginner",
    duration: "6 weeks",
    enrollments: 890,
    rating: 4.5,
    totalReviews: 178,
    instructor: "Sarah Johnson",
    createdAt: "2024-05-12",
    updatedAt: "2024-08-12",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=240&fit=crop",
  },
  {
    id: "6",
    title: "Blockchain Security Fundamentals",
    description:
      "Essential security practices for smart contract development and DeFi protocols",
    type: "eBook",
    price: 39,
    status: "archived",
    category: "Security",
    difficulty: "Intermediate",
    duration: "180 pages",
    enrollments: 567,
    rating: 4.4,
    totalReviews: 89,
    instructor: "Michael Chen",
    createdAt: "2024-01-30",
    updatedAt: "2024-06-15",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=240&fit=crop",
  },
];

const EmptyState: React.FC<{ searchTerm: string; onCreate: () => void }> = ({
  searchTerm,
  onCreate,
}) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      No products found
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6">
      {searchTerm
        ? `No products match "${searchTerm}"`
        : "Get started by creating your first product"}
    </p>
    <button
      onClick={onCreate}
      className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
    >
      Create Product
    </button>
  </div>
);

// Header Component
const Header: React.FC<{ onCreateClick: () => void }> = ({ onCreateClick }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-2">
        Product Management
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Manage your courses, bootcamps, eBooks, and codebases
      </p>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onCreateClick}
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
    </motion.button>
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
      value: "$45,230",
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

// Main Page Component (Reassembled)
const Page: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | Product["type"]>(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<"all" | Product["status"]>(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(),
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesType = selectedTab === "all" || product.type === selectedTab;
      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [selectedTab, statusFilter, searchTerm]);

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!sortConfig) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      return 0;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header onCreateClick={() => setShowProductModal(true)} />
        <StatsCards products={mockProducts} />
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
        {sortedProducts.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            onCreate={() => setShowProductModal(true)}
          />
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
            allProductsLength={mockProducts.length}
          />
        )}
        <CreateProductModal
          show={showProductModal}
          onClose={() => setShowProductModal(false)}
        />
      </div>
    </div>
  );
};

export default Page;
