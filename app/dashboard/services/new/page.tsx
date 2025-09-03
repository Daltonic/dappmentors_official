"use client";

import { Service } from "@/utils/interfaces";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiXCircle } from "react-icons/fi";
import ServiceForm from "@/components/dashboard/services/ServiceForm2";
import { toast } from "react-toastify";

const Page: React.FC = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleFormSubmit = async (serviceData: Partial<Service>) => {
    try {
      setCreateError(null);
      setIsCreating(true);

      // Mock validation (similar to product)
      if (
        !serviceData.title ||
        !serviceData.description ||
        !serviceData.type ||
        !serviceData.price ||
        !serviceData.category ||
        !serviceData.duration ||
        !serviceData.lead
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      // Mock delay for API feel
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Service created successfully!");

      // Mock redirect
      setTimeout(() => {
        router.push("/dashboard/services");
      }, 2000);
    } catch (error) {
      console.error("Unexpected error creating service:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleFormCancel = () => {
    router.push("/dashboard/services");
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
              Create New Service
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Fill in the details below to create a new service for your
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
                  Creating Service...
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Please wait while we save your service
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
                  Failed to Create Service
                </h3>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  {createError}
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
          <ServiceForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            className={`${isCreating ? "pointer-events-none opacity-50" : ""}`}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
