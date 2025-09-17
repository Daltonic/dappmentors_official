"use client";

import { Product } from "@/utils/interfaces";
import { useDelete } from "@/contexts/DeleteContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar, FaEllipsisV } from "react-icons/fa";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const ProductCard: React.FC<{
  product: Product;
  selected: boolean;
  onToggle: () => void;
  onDelete?: (productId: string) => void;
  getStatusColor: (status: Product["status"]) => string;
  getTypeColor: (type: Product["type"]) => string;
  getDifficultyColor: (type: Product["difficulty"]) => string;
}> = ({
  product,
  selected,
  onToggle,
  onDelete,
  getStatusColor,
  getTypeColor,
  getDifficultyColor,
}) => {
  const router = useRouter();
  const { showDeleteModal } = useDelete();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Handle delete action
  const handleDelete = () => {
    showDeleteModal({
      apiUrl: `/api/products/${product.id}`,
      itemTitle: product.title,
      onSuccess: () => onDelete?.(product.id),
      entity: "product",
    });
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.imageUrl || "/placeholder-image.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-4 left-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="w-4 h-4 text-[#D2145A] bg-white/90 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
          />
        </div>
        <div className="absolute top-4 right-4 flex gap-2 items-center">
          {product.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(product.status)}`}
          >
            {product.status}
          </span>
          {/* Dropdown Toggle Button */}
          <button
            ref={toggleButtonRef}
            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaEllipsisV className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-14 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[200px] z-50"
        >
          <div className="flex flex-col gap-1 p-2">
            <button
              className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              onClick={() => {
                router.push(`/dashboard/products/${product.id}/modules`);
                setIsDropdownOpen(false);
              }}
            >
              Modules
            </button>
            <button
              className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              onClick={() => {
                router.push(`/dashboard/products/${product.id}`);
                setIsDropdownOpen(false);
              }}
            >
              Edit
            </button>
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              onClick={() => setIsDropdownOpen(false)}
            >
              View
            </Link>
            <button
              className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-left"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </motion.div>
      )}

      <div className="p-6 relative z-10">
        {/* Type and Price */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getTypeColor(product.type)}`}
          >
            {product.type}
          </span>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {product.studentsEnrolled || 0} enrolled
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <Link
          href={`/products/${product.slug}`}
          target="_blank"
          className="flex items-center gap-3"
          onClick={(e) => {
            if (product.status !== "published") e.preventDefault();
          }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#D2145A] transition-colors duration-300">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Difficulty:
            </span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(product.difficulty)}`}
            >
              {product.difficulty}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Duration:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {product.duration}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Instructor:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {product.instructor.name}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Rating:</span>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500 w-4 h-4" />
              <span className="text-gray-700 dark:text-gray-300">
                {product.rating} ({product.totalReviews})
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
