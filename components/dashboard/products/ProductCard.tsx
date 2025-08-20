import { Product } from "@/utils/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";

// Product Card Component
const ProductCard: React.FC<{
  product: Product;
  selected: boolean;
  onToggle: () => void;
}> = ({ product, selected, onToggle }) => {
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

  const getDifficultyColor = (difficulty: Product["difficulty"]) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

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
          src={product.thumbnail}
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
        <div className="absolute top-4 right-4 flex gap-2">
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
        </div>
      </div>

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
              {product.enrollments} enrolled
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.title}
        </h3>
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
              {product.instructor}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Rating:</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-700 dark:text-gray-300">
                {product.rating} ({product.totalReviews})
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-2 px-4 rounded-xl text-sm font-semibold hover:scale-105 transition-transform duration-300">
            Edit
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
