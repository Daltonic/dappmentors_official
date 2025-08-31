"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Service } from "@/utils/interfaces";
import ServiceForm from "@/components/dashboard/services/ServiceForm";
import { use } from "react";
import { toast } from "react-toastify";

// Mock data for design purposes
const mockServices: Service[] = [
  {
    id: "1",
    title: "Smart Contract Development",
    description:
      "Custom smart contract development using Solidity, Rust, and Vyper for multiple blockchains",
    type: "Development",
    category: "Blockchain Development",
    price: "Custom Quote",
    status: "active",
    duration: "4-8 weeks",
    clients: 45,
    rating: 4.9,
    totalReviews: 23,
    lead: "Darlington Gospel",
    createdAt: "2024-01-15",
    updatedAt: "2024-08-20",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop",
    tags: ["Solidity", "Rust", "Security", "Multi-chain"],
    deliverables: [
      "Smart Contracts",
      "Documentation",
      "Testing Suite",
      "Deployment",
    ],
  },
  // Add more mock services as needed
];

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params); // Unwrap params using React.use()
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock fetch for design purposes
  const fetchService = () => {
    const foundService = mockServices.find((s) => s.id === id);
    if (foundService) {
      setService(foundService);
    } else {
      setError("Service not found");
    }
    setLoading(false);
  };

  // Simulate fetching service data
  setTimeout(fetchService, 1000);

  const handleFormSubmit = async (serviceData: Partial<Service>) => {
    try {
      // Mock validation
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

      toast.success("Service updated successfully!");
      // Mock redirect
      setTimeout(() => {
        router.push("/dashboard/services");
      }, 2000);
    } catch (err) {
      console.error("Update service error:", err);
      toast.error("An error occurred while updating the service");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Loading service...
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Service
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || "Service not found"}
          </p>
          <button
            onClick={() => router.push("/dashboard/services")}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Back to Services
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
            Update Service Record
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
          <ServiceForm
            service={service}
            onSubmit={handleFormSubmit}
            onCancel={() => router.back()}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
