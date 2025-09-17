"use client";

import React, { useState, useEffect } from "react";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import HeroSection from "@/components/shared/HeroSection";
import Image from "next/image";
import CTASection from "@/components/shared/CTASection";
import FAQSection from "@/components/shared/FAQSection";
import { Service } from "@/utils/interfaces";
import { Star, ArrowRight } from "lucide-react";
import QuoteSection from "@/components/services/details/QuoteSection";
import PackagesSection from "@/components/services/details/PackageSection";
import FeaturesSection from "@/components/services/details/FeaturesSection";
import { getHighlightWord } from "@/heplers/global";
import { toast } from "react-toastify";

interface PageClientProps {
  service: Service;
}

const PageClient: React.FC<PageClientProps> = ({ service }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");

  // Set first package as default on component mount
  useEffect(() => {
    if (service.packages && service.packages.length > 0) {
      setSelectedPackage(service.packages[0].name);
    }
  }, [service]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Quote request sent for ${service.title}${selectedPackage ? ` - ${selectedPackage}` : ""}`,
    );
    setName("");
    setEmail("");
    setMessage("");
    setProjectType("");
    setBudgetRange("");
    setSelectedPackage(null);
  };

  const handlePayment = async (packageName?: string) => {
    setIsPurchasing(true);
    try {
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "service",
          id: service.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process purchase");
      }

      const data = await response.json();
      toast.success(data.message || "Purchase saved successfully!");

      const itemName = packageName || service.title;
      const price = packageName
        ? service.packages.find((p) => p.name === packageName)?.price
        : service.price;
      console.log(`Processed mock purchase for ${itemName} at ${price}`);
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during purchase",
      );
    } finally {
      setIsPurchasing(false);
    }
  };

  const isFixedPrice =
    typeof service.price === "number" ||
    (typeof service.price === "string" &&
      !isNaN(parseFloat(service.price.replace(/[^0-9.-]/g, ""))));

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Dapp Mentors",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Service Packages",
      itemListElement: service.packages.map((pkg) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pkg.name,
        },
        price: pkg.price,
        priceCurrency: "USD",
      })),
    },
  };

  return (
    <MarketingLayout>
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection
        layout="grid"
        tagText="Service"
        title={service.title}
        highlightText={getHighlightWord(service.title)}
        subtitle={service.description}
        rightContent={
          <div className="relative">
            <Image
              src={service.thumbnail}
              alt={service.title}
              width={1280}
              height={720}
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <Star className="w-4 h-4" />
              {service.type}
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {service.clients}+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Projects Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {service.packages?.length || 3}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Service Packages
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Support Available
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              100%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Client Satisfaction
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() =>
              document
                .getElementById("quote-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <span className="flex items-center justify-center gap-2">
              Get Quote
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
          <button
            onClick={() =>
              document
                .getElementById("packages-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 border-[#FF4081]/50 dark:border-white/30 text-[#D2145A] dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white hover:border-transparent"
          >
            View Packages
          </button>
        </div>
      </HeroSection>

      <FeaturesSection features={service.features} />

      <PackagesSection
        service={service}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        isFixedPrice={isFixedPrice}
        handlePayment={handlePayment}
      />

      <QuoteSection
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        message={message}
        setMessage={setMessage}
        projectType={projectType}
        setProjectType={setProjectType}
        budgetRange={budgetRange}
        setBudgetRange={setBudgetRange}
        handleContactSubmit={handleContactSubmit}
      />

      <FAQSection
        faqs={service.faqs}
        subtitle="Everything you need to know about our smart contract development services."
      />
      <CTASection />

      {/* Loading Overlay for Purchase */}
      {isPurchasing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-[#D2145A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Processing Purchase
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Please wait while we record your purchase...
            </p>
          </div>
        </div>
      )}
    </MarketingLayout>
  );
};

export default PageClient;
