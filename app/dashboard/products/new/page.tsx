"use client";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { Product } from "@/utils/interfaces";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { productApiService, useApiState } from "@/services/api.services";
import { FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";

// Success/Error notification component
const Notification: React.FC<{
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
}> = ({ type, message, onClose }) => {
  const icons = {
    success: <FiCheckCircle className="w-5 h-5" />,
    error: <FiXCircle className="w-5 h-5" />,
    warning: <FiAlertTriangle className="w-5 h-5" />,
  };

  const colors = {
    success:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800",
    error:
      "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800",
    warning:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-xl border flex items-center gap-3 shadow-lg backdrop-blur-sm ${colors[type]}`}
    >
      {icons[type]}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <FiXCircle className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const Page: React.FC = () => {
  const router = useRouter();
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  // Use the API state hook with enhanced features
  const {
    data: createdProduct,
    loading: isCreating,
    error: createError,
    execute: executeCreate,
    reset: resetApiState,
  } = useApiState<{ message: string; product: Product }>({
    onSuccess: (data, message) => {
      setNotification({
        type: "success",
        message: message || "Product created successfully!",
      });
      // Redirect to products list or product detail page after success
      setTimeout(() => {
        router.push("/dashboard/products");
      }, 2000);
    },
    onError: (error) => {
      setNotification({
        type: "error",
        message: error,
      });
    },
  });

  const handleFormSubmit = async (productData: Partial<Product>) => {
    try {
      // Reset previous states
      resetApiState();
      setNotification(null);

      // Validate required fields and convert to CreateProductData format
      if (
        !productData.title ||
        !productData.description ||
        !productData.type ||
        productData.price === undefined ||
        !productData.category ||
        !productData.difficulty ||
        !productData.duration ||
        !productData.instructor
      ) {
        setNotification({
          type: "error",
          message: "Please fill in all required fields.",
        });
        return;
      }

      const createProductData = {
        title: productData.title,
        description: productData.description,
        type: productData.type,
        price: productData.price,
        status: productData.status || "draft",
        category: productData.category,
        difficulty: productData.difficulty,
        duration: productData.duration,
        instructor: productData.instructor,
        featured: productData.featured || false,
        thumbnail: productData.imageUrl || "",
      };

      // Execute the API call
      await executeCreate(() =>
        productApiService.createProduct(createProductData),
      );
    } catch (error) {
      console.error("Unexpected error creating product:", error);
      setNotification({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleFormCancel = () => {
    // Reset form state and navigate back
    resetApiState();
    setNotification(null);
    router.push("/dashboard/products");
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-cambo font-normal text-gray-900 dark:text-white mb-4">
              Create New Product
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Fill in the details below to create a new product for your
              platform
            </p>
          </motion.div>
        </div>

        {/* Loading State Overlay */}
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="w-8 h-8 border-4 border-[#D2145A]/30 border-t-[#D2145A] rounded-full animate-spin" />
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Creating Product...
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Please wait while we save your product
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {createError && !isCreating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <FiXCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">
                  Failed to Create Product
                </h3>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  {createError}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success State */}
        {createdProduct && !isCreating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Product Created Successfully!
                </h3>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  {createdProduct.message} Redirecting to products list...
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Create Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ProductForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            className={`${isCreating ? "pointer-events-none opacity-50" : ""}`}
          />
        </motion.div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default Page;
