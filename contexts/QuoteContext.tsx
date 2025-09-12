"use client";

import { Service } from "@/utils/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import {
  X,
  Star,
  Users,
  CheckCircle,
  DollarSign,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

interface QuoteContextType {
  showQuoteModal: (service: Service) => void;
  hideQuoteModal: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
};

const QuoteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}> = ({ isOpen, onClose, service }) => {
  // State for the contact form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"packages" | "features" | "faqs">(
    "packages",
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Set first package as default on modal open
  useEffect(() => {
    if (isOpen && service.packages && service.packages.length > 0) {
      setSelectedPackage(service.packages[0].name);
    }
  }, [isOpen, service]);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Quote request sent for ${service.title}${selectedPackage ? ` - ${selectedPackage}` : ""}`,
    );
    setName("");
    setEmail("");
    setMessage("");
    setSelectedPackage(null);
    onClose();
  };

  const handlePayment = (packageName?: string) => {
    const itemName = packageName || service.title;
    const price = packageName
      ? service.packages.find((p) => p.name === packageName)?.price
      : service.price;
    alert(`Processing payment for ${itemName} at ${price}`);
    onClose();
  };

  const isFixedPrice =
    typeof service.price === "number" ||
    (typeof service.price === "string" &&
      !isNaN(parseFloat(service.price.replace(/[^0-9.-]/g, ""))));

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-hidden sm:overflow-visible">
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl max-w-6xl w-full overflow-y-auto shadow-2xl flex flex-col"
        style={{
          maxHeight: "70vh",
          ...(window.innerWidth >= 640 && { maxHeight: "85vh" }),
        }}
      >
        {/* Header */}
        <div className="relative p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-10"
            style={{ right: "30px" }}
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 pr-10 sm:pr-12">
            {service.thumbnail && (
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 mx-auto sm:mx-0">
                <Image
                  src={service.thumbnail}
                  alt={service.title}
                  fill
                  className="rounded-xl sm:rounded-2xl object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                {service.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 max-w-3xl">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{service.clients} clients</span>
                </div>
                <span className="px-3 py-1 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white rounded-full text-xs font-medium">
                  {service.type}
                </span>
                {service.featured && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left Side - Service Details */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Tab Navigation */}
              <div className="flex gap-1 mb-4 sm:mb-6 bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-1">
                {(["packages", "features", "faqs"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-2 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all capitalize ${
                      activeTab === tab
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab === "faqs" ? "FAQs" : tab}
                  </button>
                ))}
              </div>

              {/* Packages Tab */}
              {activeTab === "packages" && (
                <div className="space-y-3">
                  {service.packages && service.packages.length > 0 ? (
                    <div className="space-y-3">
                      {service.packages.map((pkg, index) => (
                        <div
                          key={index}
                          className={`p-3 sm:p-4 border rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
                            selectedPackage === pkg.name
                              ? "border-[#D2145A] bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 ring-2 ring-[#D2145A]/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          } ${pkg.popular ? "ring-2 ring-[#D2145A]/30" : ""}`}
                          onClick={() =>
                            setSelectedPackage(
                              selectedPackage === pkg.name ? null : pkg.name,
                            )
                          }
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                              <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                                {pkg.name}
                              </h4>
                              {pkg.popular && (
                                <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-2 py-1 rounded-full">
                                  <Star className="w-3 h-3" />
                                  Popular
                                </div>
                              )}
                            </div>
                            <span className="font-bold text-lg sm:text-xl text-[#D2145A]">
                              {/\d/.test(pkg.price)
                                ? parseFloat(pkg.price).toLocaleString(
                                    "en-US",
                                    { style: "currency", currency: "USD" },
                                  )
                                : pkg.price}
                            </span>
                          </div>
                          <div className="space-y-2 mb-4">
                            {/* Display ALL features without truncation */}
                            {pkg.features.map((feature, fIndex) => (
                              <div
                                key={fIndex}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                          {selectedPackage === pkg.name && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Check if price is numeric (contains digits and currency symbols)
                                const hasNumericPrice = /\d/.test(pkg.price);
                                if (hasNumericPrice) {
                                  handlePayment(pkg.name);
                                } else {
                                  // For custom pricing, scroll to quote form
                                  const quoteForm =
                                    document.querySelector("form");
                                  quoteForm?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }}
                              className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 sm:py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
                            >
                              {/\d/.test(pkg.price)
                                ? `Pay Now - ${parseFloat(pkg.price).toLocaleString("en-US", { style: "currency", currency: "USD" })}`
                                : "Request Custom Quote"}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        No packages available
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <div className="space-y-4">
                  {service.features && service.features.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {/* Display ALL features without truncation */}
                      {service.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        No features listed
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* FAQs Tab */}
              {activeTab === "faqs" && (
                <div className="space-y-3">
                  {service.faqs && service.faqs.length > 0 ? (
                    service.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-3 sm:p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 pr-2">
                            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2145A] flex-shrink-0 mt-0.5 sm:mt-0" />
                            <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white text-left">
                              {faq.question}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform ${
                              openFaqIndex === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openFaqIndex === index && (
                          <div className="p-3 sm:p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <HelpCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No FAQs available
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Pricing & Contact */}
          <div className="flex-1 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                Get Started
              </h3>

              {/* Standard Pricing (if available and no packages) */}
              {isFixedPrice && !service.packages?.length && (
                <div className="p-4 sm:p-5 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 border border-[#D2145A]/20 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[#D2145A]" />
                    <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                      Standard Pricing
                    </h4>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-[#D2145A] mb-4">
                    ${service.price}
                  </p>
                  <button
                    onClick={() => handlePayment()}
                    className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
                  >
                    Pay Now
                  </button>
                </div>
              )}

              {/* Custom Quote Form */}
              <div className="p-4 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl">
                <h4 className="font-bold text-base sm:text-lg mb-4 text-gray-900 dark:text-white">
                  Request Custom Quote
                </h4>
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#D2145A]/20 focus:border-[#D2145A] outline-none transition-all text-sm sm:text-base"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#D2145A]/20 focus:border-[#D2145A] outline-none transition-all text-sm sm:text-base"
                    required
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project requirements..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#D2145A]/20 focus:border-[#D2145A] outline-none transition-all resize-none text-sm sm:text-base"
                    rows={3}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-white dark:bg-gray-700 border-2 border-[#D2145A] text-[#D2145A] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:bg-[#D2145A] hover:text-white transition-all duration-300 text-sm sm:text-base"
                  >
                    Send Quote Request
                  </button>
                </form>
              </div>

              {/* Selected Package Info */}
              {selectedPackage && (
                <div className="p-3 sm:p-4 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 border border-[#D2145A]/20 rounded-xl sm:rounded-2xl">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2">
                    Selected Package
                  </h4>
                  <p className="text-[#D2145A] font-bold text-base sm:text-lg">
                    {selectedPackage}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const showQuoteModal = (service: Service) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const hideQuoteModal = () => {
    setIsOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <QuoteContext.Provider value={{ showQuoteModal, hideQuoteModal }}>
      {children}
      {isOpen && selectedService && (
        <QuoteModal
          isOpen={isOpen}
          onClose={hideQuoteModal}
          service={selectedService}
        />
      )}
    </QuoteContext.Provider>
  );
};
