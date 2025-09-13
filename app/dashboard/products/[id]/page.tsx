"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Product } from "@/utils/interfaces";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { use } from "react";
import { toast } from "react-toastify";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params); // Unwrap params using React.use()
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        console.error("Fetch product error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFormSubmit = async (productData: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      await response.json();
      toast.success("Product updated successfully!", {
        onClose: () => router.push("/dashboard/products"), // Redirect after toast closes
      });
    } catch (err) {
      console.error("Update product error:", err);
      toast.error(err instanceof Error ? err.message : "An error occurred", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Loading product...
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Product
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || "Product not found"}
          </p>
          <button
            onClick={() => router.push("/dashboard/products")}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

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
            product={product}
            onSubmit={handleFormSubmit}
            onCancel={() => router.back()}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
