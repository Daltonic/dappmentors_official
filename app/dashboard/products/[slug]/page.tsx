"use client";

import { motion } from "framer-motion";
import { Product } from "@/utils/interfaces";
import ProductForm from "@/components/dashboard/products/ProductForm";

// Example usage component
const Page: React.FC = () => {
  // Mock product for editing example
  const mockProduct: Product = {
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
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-08-15"),
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop",
  };

  const handleFormSubmit = (productData: Partial<Product>) => {
    console.log("Form submitted with data:", productData);
    alert(`Product ${productData.id ? "updated" : "created"} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-cambo font-normal text-gray-900 dark:text-white mb-4">
            Update Product Record
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            A single form component that automatically detects create/edit mode
            based on props
          </p>
        </div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ProductForm
            product={mockProduct}
            onSubmit={handleFormSubmit}
            onCancel={() => console.log("Edit cancelled")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
