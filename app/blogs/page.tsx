"use client";

import AllPostsSection from "@/components/blogs/AllPostsSection";
import FeaturedPostsSection from "@/components/blogs/FeaturedPostSection";
import SearchFilterSection from "@/components/blogs/SearchFilterSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import React from "react";

// Main Blogs Page Component
const Page = () => {
  return (
    <MarketingLayout>
      <HeroSection
        tagText="Web3 Blog"
        title="Your Source for Web3 Insights"
        highlightText="Web3 Insights"
        subtitle="Free, high-quality tutorials, guides, and insights into the ever-evolving world of blockchain development from our expert team."
      />
      <SearchFilterSection />
      <FeaturedPostsSection />
      <AllPostsSection />
      <CTASection
        title="Ready to Start Your Web3 Journey?"
        highlightText="Web3 Journey"
        subtitle="Explore our blog posts, join our community, and take advantage of our premium courses and bootcamps to accelerate your Web3 development skills."
        primaryButtonText="Join Discord Community"
        secondaryButtonText="View All Courses"
        gradientFrom="from-gray-900"
        gradientTo="to-purple-900"
        darkGradientFrom="dark:from-black"
        darkGradientTo="dark:to-purple-900"
      />
    </MarketingLayout>
  );
};

export default Page;
