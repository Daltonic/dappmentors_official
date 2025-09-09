"use client";

import React, { useState } from "react";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import HeroSection from "@/components/shared/HeroSection";
import Image from "next/image";
import { Product } from "@/utils/interfaces";
import FeaturesSection from "@/components/products/details/FeaturesSection";
import ProductContentSection from "@/components/products/details/ProductContentSection";
import InstructorSection from "@/components/products/details/InstructorSection";
import TestimonialsSection from "@/components/products/details/TestimonialsSection";
import FAQSection from "@/components/shared/FAQSection";
import FinalCTASection from "@/components/products/details/FinalCTASection";
import { toast } from "react-toastify";

interface PageClientProps {
  product: Product;
}

const PageClient: React.FC<PageClientProps> = ({ product }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    // Simulate enrollment process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Enrolling in: ${product.title}`);
    toast.success(`Successfully enrolled in ${product.title}!`);
    setIsEnrolling(false);
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: product.title,
    description: product.description,
    provider: {
      "@type": "Organization",
      name: "Dapp Mentors",
    },
    instructor: {
      "@type": "Person",
      name: product.instructor.name,
      description: product.instructor.bio || "", // Fallback for optional bio
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 0, // Fallback for optional rating
      ratingCount: product.totalReviews,
    },
  };

  return (
    <MarketingLayout>
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <HeroSection
        layout="grid"
        tagText="Course"
        title="Complete Solidity Smart Contract Development Masterclass"
        highlightText="Smart Contract Development"
        subtitle="Master Ethereum Development from Zero to Professional"
        rightContent={
          <Image
            src={product.imageUrl || "/placeholder-image.svg"} // Fallback for undefined imageUrl
            alt={product.title}
            width={1280}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        }
      >
        {/* Your pricing and CTA buttons */}
        <div className="flex flex-col items-start justify-center gap-4 mb-8">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(product.rating || 0) ? "★" : "☆"} // Fallback for rating
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {/* {product.rating || 0} ({product.totalReviews.toLocaleString() || 0} reviews) */}
                {product.rating || 0} (
                {(product.totalReviews || 0).toLocaleString()} reviews)
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {(product.studentsEnrolled || 0).toLocaleString()} students
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {product.duration}
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </div>
            {product.originalPrice && (
              <>
                <div className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice}
                </div>
                <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  10% OFF
                </div>
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center justify-center gap-2">
                Enroll Now
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
            <button className="group bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 border-[#FF4081]/50 dark:border-white/30 text-[#D2145A] dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white">
              Preview Course
            </button>
          </div>
        </div>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection features={product.features || []} />

      {/* Course Content Section */}
      <ProductContentSection
        modules={product.modules || []} // Fallback for optional modules
        includes={product.includes || []}
      />

      {/* Instructor Section */}
      <InstructorSection instructor={product.instructor} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={product.testimonials || []} />

      {/* FAQ Section */}
      <FAQSection
        subtitle="Everything you need to know about this product"
        faqs={product.faqs || []}
      />

      {/* Final CTA Section */}
      <FinalCTASection product={product} onEnroll={handleEnroll} />

      {/* Sticky Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 md:hidden z-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </div>
            )}
          </div>
          <button
            onClick={handleEnroll}
            disabled={isEnrolling}
            className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isEnrolling && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-[#D2145A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Processing Enrollment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Please wait while we set up your access...
            </p>
          </div>
        </div>
      )}
    </MarketingLayout>
  );
};

export default PageClient;
