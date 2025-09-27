// components/shared/PackagesSection.tsx
"use client";

import React from "react";
import { Product, Service, Package as PackageType } from "@/utils/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

interface SharedPackagesSectionProps {
  item: Product | Service;
  selectedPackage: string | null;
  setSelectedPackage: (val: string | null) => void;
  isFixedPrice: boolean;
  handlePurchase: (packageName?: string, packagePrice?: string) => void;
  itemType: "product" | "service";
}

const PackagesSection: React.FC<SharedPackagesSectionProps> = ({
  item,
  selectedPackage,
  setSelectedPackage,
  isFixedPrice,
  handlePurchase,
  itemType,
}) => {
  const getButtonText = (isNumericPrice: boolean, type: string): string => {
    if (!isNumericPrice) {
      return "Request Custom";
    }

    const texts =
      itemType === "service"
        ? {
            Hiring: "Hire Now",
            Education: "Hire Us Now",
            Mentorship: "Book Now",
            Professional: "Hire Us Now",
            Writing: "Hire Us Now",
          }
        : {
            Course: "Enroll Now",
            Bootcamp: "Join Now",
            Ebook: "Buy Now",
            Codebase: "Get Now",
          };

    return texts[type as keyof typeof texts] || "Buy";
  };

  const getPriceDisplay = (price: string | number): string => {
    const isNumericPrice = (() => {
      if (typeof price === "number") return true;
      if (typeof price === "string") {
        const numericValue = price.replace(/[^0-9.-]/g, "");
        const parsedPrice = parseFloat(numericValue);
        return !isNaN(parsedPrice) && parsedPrice > 0;
      }
      return false;
    })();

    if (isNumericPrice) {
      const priceValue =
        typeof price === "number"
          ? price
          : parseFloat(price.replace(/[^0-9.-]/g, ""));
      return priceValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    return "Custom";
  };

  const getQuickInfo = () => {
    if (itemType === "product") {
      const product = item as Product;
      return [
        { label: "Duration", value: product.duration },
        { label: "Level", value: product.difficulty || product.level },
        { label: "Language", value: product.language || "English" },
      ];
    } else {
      return [
        { label: "Response Time", value: "Within 2 hours" },
        { label: "Project Start", value: "Next business day" },
        { label: "Support", value: "24/7 Available" },
      ];
    }
  };

  const getInfoSubtitle = () => {
    if (itemType === "product") {
      const product = item as Product;
      return `${product.type} • ${product.difficulty || product.level}`;
    } else {
      return (item as Service).type;
    }
  };

  const getItemPrice = () => {
    if (itemType === "product") {
      return (item as Product).price;
    } else {
      return (item as Service).price;
    }
  };

  const packages = (item.packages || []) as PackageType[];

  return (
    <section
      id="packages-section"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            {itemType === "product" ? "Product Packages" : "Service Packages"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            {itemType === "product"
              ? "Choose from our flexible pricing packages designed to fit your learning needs and budget."
              : "Explore our comprehensive service offerings, detailed features, and pricing packages designed to meet your specific needs."}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Package Listings */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="packages"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {packages.length > 0 ? (
                      packages.map((pkg, index) => {
                        const isNumericPrice = (() => {
                          if (typeof pkg.price === "number") return true;
                          if (typeof pkg.price === "string") {
                            const numericValue = pkg.price.replace(
                              /[^0-9.-]/g,
                              "",
                            );
                            const parsedPrice = parseFloat(numericValue);
                            return !isNaN(parsedPrice) && parsedPrice > 0;
                          }
                          return false;
                        })();

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 border-2 rounded-2xl transition-all cursor-pointer group ${
                              selectedPackage === pkg.name
                                ? "border-[#D2145A] bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 ring-2 ring-[#D2145A]/20"
                                : "border-gray-200 dark:border-gray-600 hover:border-[#FF4081]/50"
                            } ${pkg.popular ? "ring-2 ring-[#D2145A]/30" : ""}`}
                            onClick={() =>
                              setSelectedPackage(
                                selectedPackage === pkg.name ? null : pkg.name,
                              )
                            }
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                                  {pkg.name}
                                </h4>
                                {pkg.popular && (
                                  <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 rounded-full">
                                    <Star className="w-3 h-3" />
                                    Most Popular
                                  </div>
                                )}
                              </div>
                              <span className="font-bold text-2xl text-[#D2145A]">
                                {getPriceDisplay(pkg.price)}
                              </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 mb-6">
                              {pkg.features.map((feature, fIndex) => (
                                <div
                                  key={fIndex}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {selectedPackage === pkg.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t pt-4"
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (isNumericPrice) {
                                      handlePurchase(pkg.name, pkg.price);
                                    } else {
                                      toast.info(
                                        "Contact us for custom pricing details.",
                                      );
                                    }
                                  }}
                                  className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 text-lg group"
                                >
                                  <span className="flex items-center justify-center gap-2">
                                    {getButtonText(isNumericPrice, item.type)}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                  </span>
                                </button>
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12">
                        <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          {itemType === "product"
                            ? "Standard pricing applies"
                            : "Custom packages available upon request"}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Side - Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={
                        itemType === "product"
                          ? (item as Product).imageUrl ||
                            "/placeholder-image.svg"
                          : (item as Service).thumbnail ||
                            "/placeholder-image.svg"
                      }
                      alt={item.title}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Star className="w-4 h-4" />
                      <span>{getInfoSubtitle()}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Package Info */}
                {selectedPackage && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 border border-[#D2145A]/20 rounded-xl">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      Selected Package
                    </h4>
                    <p className="text-[#D2145A] font-bold text-lg">
                      {selectedPackage}
                    </p>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {packages.find((p) => p.name === selectedPackage)?.price}
                    </span>
                  </div>
                )}

                {/* Standard Pricing */}
                {isFixedPrice && packages.length === 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 border border-[#D2145A]/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="w-5 h-5 text-[#D2145A]" />
                      <h4 className="font-bold text-base text-gray-900 dark:text-white">
                        Standard Pricing
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-[#D2145A] mb-4">
                      {getPriceDisplay(getItemPrice())}
                    </p>
                    <button
                      onClick={() => handlePurchase()}
                      className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300"
                    >
                      {getButtonText(true, item.type)}
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                  {itemType === "product" ? "Quick Info" : "Quick Contact"}
                </h4>
                <div className="space-y-3 text-sm">
                  {getQuickInfo().map((info, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {info.label}:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {info.value}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById(
                        itemType === "product"
                          ? "content-section"
                          : "quote-section",
                      )
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-bold hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white transition-all duration-300"
                >
                  {itemType === "product" ? "View Content" : "Get Custom Quote"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
