"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import HeroSection from "@/components/shared/HeroSection";
import Image from "next/image";
import CTASection from "@/components/shared/CTASection";
import FAQSection from "@/components/shared/FAQSection";
import { Service } from "@/utils/interfaces";

interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

interface ServicePackage {
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
}

interface PageClientProps {
  service: Service;
}

const PageClient: React.FC<PageClientProps> = ({ service }) => {
  const [showContactForm, setShowContactForm] = useState(false);

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: service.rating.toFixed(1),
      reviewCount: service.totalReviews,
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
        highlightText={service.title.split(" ")[2]}
        subtitle={service.subtitle}
        rightContent={
          <Image
            src={service.thumbnail}
            alt={service.title}
            width={1280}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
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
              {(service.rating * 20).toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Client Satisfaction
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {service.duration}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Delivery Time
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowContactForm(true)}
            className="group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <span className="flex items-center justify-center gap-2">
              Get Quote
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
          <button className="group bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 border-[#FF4081]/50 dark:border-white/30 text-[#D2145A] dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white hover:border-transparent">
            View Portfolio
          </button>
        </div>
      </HeroSection>

      <FeaturesSection features={service.features} />
      <TechnologySection
        technologies={service.technologies}
        blockchains={service.blockchains}
      />
      <PricingSection packages={service.packages} />
      <FAQSection
        faqs={service.faqs}
        subtitle="Everything you need to know about our smart contract development services."
      />
      <CTASection />

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 w-full max-w-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-cambo font-normal text-gray-900 dark:text-white">
                  Get Your Project Quote
                </h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300">
                      <option value="">Select project type</option>
                      <option value="defi">DeFi Protocol</option>
                      <option value="nft">NFT Contract</option>
                      <option value="token">Token Contract</option>
                      <option value="dao">DAO System</option>
                      <option value="marketplace">Marketplace</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300">
                      <option value="">Select budget range</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000-15000">$5,000 - $15,000</option>
                      <option value="15000-50000">$15,000 - $50,000</option>
                      <option value="50000+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                    placeholder="Describe your project requirements, timeline, and any specific features needed..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group"
                  >
                    <span className="relative z-10">Send Request</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MarketingLayout>
  );
};

// Features Section
const FeaturesSection: React.FC<{ features: ServiceFeature[] }> = ({
  features,
}) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            What You&apos;ll Get From This Service
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Professional-grade development with security, efficiency, and
            scalability at the core of every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Technology Stack Section
const TechnologySection: React.FC<{
  technologies: string[];
  blockchains: string[];
}> = ({ technologies, blockchains }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Our Technology Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We use cutting-edge tools and frameworks to deliver robust, scalable
            smart contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Development Tools
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-4 text-center border border-gray-200/50 dark:border-gray-700/50 hover:border-[#FF4081]/50 transition-all duration-300"
                >
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Supported Blockchains
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {blockchains.map((blockchain, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-4 text-center border border-gray-200/50 dark:border-gray-700/50 hover:border-[#FF4081]/50 transition-all duration-300"
                >
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {blockchain}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Packages Section
const PricingSection: React.FC<{ packages: ServicePackage[] }> = ({
  packages,
}) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Service Packages
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the package that best fits your project requirements and
            budget.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 transition-all duration-500 ${
                pkg.popular
                  ? "border-[#D2145A] shadow-2xl scale-105"
                  : "border-gray-200 dark:border-gray-700 hover:border-[#FF4081]/50 hover:shadow-xl"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {pkg.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {pkg.price}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {pkg.duration}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 ${
                  pkg.popular
                    ? "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white hover:shadow-xl"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageClient;
