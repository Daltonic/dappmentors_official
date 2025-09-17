import { Service } from "@/utils/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

// Packages Section
const PackagesSection: React.FC<{
  service: Service;
  selectedPackage: string | null;
  setSelectedPackage: (val: string | null) => void;
  isFixedPrice: boolean;
  handlePayment: (packageName?: string) => void;
}> = ({
  service,
  selectedPackage,
  setSelectedPackage,
  isFixedPrice,
  handlePayment,
}) => {
  return (
    <section
      id="packages-section"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Service Details & Packages
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Explore our comprehensive service offerings, detailed features, and
            pricing packages designed to meet your specific needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Service Navigation & Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              {/* Tab Content */}
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
                    {service.packages && service.packages.length > 0 ? (
                      service.packages.map((pkg, index) => (
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
                              {(() => {
                                // Check if price is numeric and format button text accordingly
                                const isNumericPrice = (() => {
                                  if (typeof pkg.price === "number")
                                    return true;
                                  if (typeof pkg.price === "string") {
                                    const numericValue = pkg.price.replace(
                                      /[^0-9.-]/g,
                                      "",
                                    );
                                    const parsedPrice =
                                      parseFloat(numericValue);
                                    return (
                                      !isNaN(parsedPrice) && parsedPrice > 0
                                    );
                                  }
                                  return false;
                                })();

                                if (isNumericPrice) {
                                  const price =
                                    typeof pkg.price === "number"
                                      ? pkg.price
                                      : parseFloat(
                                          pkg.price.replace(/[^0-9.-]/g, ""),
                                        );

                                  return price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  });
                                }

                                return "Custom";
                              })()}
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
                                  const hasNumericPrice = /\d/.test(
                                    String(pkg.price),
                                  );
                                  if (hasNumericPrice) {
                                    handlePayment(pkg.name);
                                  } else {
                                    document
                                      .getElementById("quote-section")
                                      ?.scrollIntoView({
                                        behavior: "smooth",
                                      });
                                  }
                                }}
                                className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 text-lg group"
                              >
                                <span className="flex items-center justify-center gap-2">
                                  {(() => {
                                    // Check if price is numeric and format button text accordingly
                                    const isNumericPrice = (() => {
                                      if (typeof pkg.price === "number")
                                        return true;
                                      if (typeof pkg.price === "string") {
                                        const numericValue = pkg.price.replace(
                                          /[^0-9.-]/g,
                                          "",
                                        );
                                        const parsedPrice =
                                          parseFloat(numericValue);
                                        return (
                                          !isNaN(parsedPrice) && parsedPrice > 0
                                        );
                                      }
                                      return false;
                                    })();

                                    if (isNumericPrice) {
                                      const price =
                                        typeof pkg.price === "number"
                                          ? pkg.price
                                          : parseFloat(
                                              pkg.price.replace(
                                                /[^0-9.-]/g,
                                                "",
                                              ),
                                            );

                                      return `Pay Now - ${price.toLocaleString(
                                        "en-US",
                                        {
                                          style: "currency",
                                          currency: "USD",
                                        },
                                      )}`;
                                    }

                                    return "Request Custom Quote";
                                  })()}
                                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                              </button>
                            </motion.div>
                          )}
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          Custom packages available upon request
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Side - Pricing & Quote Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Service Info Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={service.thumbnail}
                      alt={service.title}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{service.clients} clients</span>
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
                      {
                        service.packages.find((p) => p.name === selectedPackage)
                          ?.price
                      }
                    </span>
                  </div>
                )}

                {/* Standard Pricing (if available and no packages) */}
                {isFixedPrice && !service.packages?.length && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 border border-[#D2145A]/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="w-5 h-5 text-[#D2145A]" />
                      <h4 className="font-bold text-base text-gray-900 dark:text-white">
                        Standard Pricing
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-[#D2145A] mb-4">
                      ${service.price}
                    </p>
                    <button
                      onClick={() => handlePayment()}
                      className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300"
                    >
                      Pay Now
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Contact */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                  Quick Contact
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Response Time:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Within 2 hours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Project Start:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Next business day
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Support:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      24/7 Available
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("quote-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-bold hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white transition-all duration-300"
                >
                  Get Custom Quote
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
