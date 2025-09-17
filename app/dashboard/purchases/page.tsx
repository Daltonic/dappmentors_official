"use client";

import { Product, Service } from "@/utils/interfaces";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PurchaseFeed from "@/components/dashboard/purchases/PurchaseFeed";
import { useState, useEffect } from "react";

const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/purchases")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch purchases");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
        setServices(data.services || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
        setError("Failed to load purchases. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen p-4 md:p-8">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen p-4 md:p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="My Purchases"
          subtitle="View your recent purchases"
        />
        <PurchaseFeed products={products} services={services} />
      </div>
    </div>
  );
};

export default Page;
