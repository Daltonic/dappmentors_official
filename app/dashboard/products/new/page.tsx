"use client";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { Product } from "@/utils/interfaces";
import { motion } from "framer-motion";

// Example usage component
const Page: React.FC = () => {
  const handleFormSubmit = (productData: Partial<Product>) => {
    console.log("Form submitted with data:", productData);
    alert(`Product ${productData.id ? "updated" : "created"} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-cambo font-normal text-gray-900 dark:text-white mb-4">
            Create New Product
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            A single form component that automatically detects create/edit mode
            based on props
          </p>
        </div>

        {/* Create Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ProductForm
            onSubmit={handleFormSubmit}
            onCancel={() => console.log("Create cancelled")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
