"use client";

import AllPostsSection from "@/components/blogs/AllPostsSection";
import CommunitySection from "@/components/blogs/CommunitySection";
import FeaturedPostsSection from "@/components/blogs/FeaturedPostSection";
import NewsletterSection from "@/components/blogs/NewsLetterSection";
import SearchFilterSection from "@/components/blogs/SearchFilterSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";
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
      <NewsletterSection />
      <CommunitySection />
    </MarketingLayout>
  );
};

export default Page;
