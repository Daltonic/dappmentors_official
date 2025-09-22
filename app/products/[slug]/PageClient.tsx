"use client";

import React, { useState } from "react";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import HeroSection from "@/components/shared/HeroSection";
import Image from "next/image";
import { Product, ICheckoutItem } from "@/utils/interfaces";
import FeaturesSection from "@/components/products/details/FeaturesSection";
import ProductContentSection from "@/components/products/details/ProductContentSection";
import InstructorSection from "@/components/products/details/InstructorSection";
import TestimonialsSection from "@/components/products/details/TestimonialsSection";
import FAQSection from "@/components/shared/FAQSection";
import { toast } from "react-toastify";
import { Star, ArrowRight } from "lucide-react";
import { getHighlightWord } from "@/heplers/global";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import CTASection from "@/components/shared/CTASection";

interface PageClientProps {
  product: Product;
}

const PageClient: React.FC<PageClientProps> = ({ product }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // Ensure isPurchased is always a boolean
  const isPurchased = user?.purchasedProducts?.includes(product.id) ?? false;

  const getActionText = (
    type: string,
    isPurchased: boolean,
    isLoading: boolean,
  ) => {
    const viewTexts: Record<string, string> = {
      Course: "View Course",
      Bootcamp: "View Bootcamp",
      Ebook: "View Ebook",
      Codebase: "View Codebase",
    };

    const buyTexts: Record<string, string> = {
      Course: "Enroll Now",
      Bootcamp: "Join Now",
      Ebook: "Buy Now",
      Codebase: "Get Now",
    };

    const loadingText = "Processing...";

    if (isPurchased) {
      return viewTexts[type] || `View ${type}`;
    }

    if (isLoading) {
      return loadingText;
    }

    return buyTexts[type] || "Buy Now";
  };

  const actionButtonText = getActionText(
    product.type,
    isPurchased,
    isPurchasing,
  );

  const handlePurchase = async () => {
    setIsPurchasing(true);

    const item: ICheckoutItem = {
      id: product.id,
      image: product.imageUrl,
      quantity: 1,
      type: "product",
      price: Number(product.price),
      name: product.title,
    };

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [item],
        }),
      });

      if (response.status === 401) {
        window.location.href = `/auth/login?redirectTo=${encodeURIComponent(window.location.pathname)}`;
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initiate checkout");
      }

      const data = await response.json();
      window.location.href = data.checkoutSession.url;
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

  const handleAction = () => {
    if (isPurchased) {
      router.push(`/dashboard/purchases/${product.id}/lessons`);
    } else {
      handlePurchase();
    }
  };

  // Generate structured data for SEO
  const getStructuredDataType = (type: string) => {
    switch (type) {
      case "Course":
      case "Bootcamp":
        return "Course";
      case "Ebook":
        return "Book";
      case "Codebase":
        return "SoftwareApplication";
      default:
        return "Product";
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": getStructuredDataType(product.type),
    name: product.title,
    description: product.description,
    provider: {
      "@type": "Organization",
      name: "Dapp Mentors",
    },
    ...(product.type === "Ebook" && {
      author: {
        "@type": "Person",
        name: product.instructor?.name || "",
      },
    }),
    ...(product.type !== "Ebook" && {
      instructor: {
        "@type": "Person",
        name: product.instructor?.name || "",
        description: product.instructor?.bio || "",
      },
    }),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        ratingCount: product.totalReviews || 0,
      },
    }),
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
        tagText={product.type}
        title={product.title}
        highlightText={getHighlightWord(product.title)}
        subtitle={product.subtitle || product.description}
        rightContent={
          <div className="relative">
            <Image
              src={product.imageUrl || "/placeholder-image.svg"}
              alt={product.title}
              width={1280}
              height={720}
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <Star className="w-4 h-4" />
              {product.level || product.difficulty || product.category}
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.studentsEnrolled || 0}+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Students Enrolled
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.duration}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.modules?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Modules
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.rating?.toFixed(1) || "5.0"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Average Rating
            </div>
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
                {Math.round(
                  ((Number(product.originalPrice) - Number(product.price)) /
                    Number(product.originalPrice)) *
                    100,
                )}
                % OFF
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAction}
            disabled={isPurchasing && !isPurchased}
            className="group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              {actionButtonText}
              {!isPurchased && (
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </span>
          </button>
          <button className="group bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 border-[#FF4081]/50 dark:border-white/30 text-[#D2145A] dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white hover:border-transparent">
            Preview {product.type}
          </button>
        </div>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection features={product.features || []} />

      {/* Course Content Section */}
      <ProductContentSection
        modules={product.modules || []}
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
      <CTASection />

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
            onClick={handleAction}
            disabled={isPurchasing && !isPurchased}
            className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            {actionButtonText}
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isPurchasing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-[#D2145A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Processing Purchase
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
