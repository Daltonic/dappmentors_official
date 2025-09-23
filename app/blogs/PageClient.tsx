// app/blogs/page.tsx
"use client";

import AllPostsSection from "@/components/blogs/AllPostsSection";
import SearchFilterSection from "@/components/blogs/SearchFilterSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import React from "react";
import { BlogPost } from "@/utils/interfaces";
import FeaturedPostsSection from "@/components/blogs/FeaturedPostSection";
import { useRouter } from "next/navigation";
import { FaDev } from "react-icons/fa";

interface PageClientProps {
  blogs: BlogPost[];
}

const PageClient = ({ blogs }: PageClientProps) => {
  const router = useRouter();
  const featuredBlogs = blogs.filter((blog) => blog.featured);
  const notFeatured = blogs.filter((blog) => !blog.featured);

  // CTA Actions
  const handlePrimaryCTA = () => {
    window.open("https://dev.to/daltonic", "_blank");
  };

  const handleSecondaryCTA = () => {
    router.push("/products");
  };

  return (
    <MarketingLayout>
      <HeroSection
        tagText="Web3 Blogs"
        title="Your Source for Web3 Insights"
        highlightText="Web3 Insights"
        subtitle="Free, high-quality tutorials, guides, and insights into the ever-evolving world of blockchain development from our expert team."
      />
      <SearchFilterSection />
      <FeaturedPostsSection blogs={featuredBlogs} />
      <AllPostsSection blogs={notFeatured} />
      <CTASection
        title="Ready to Start Your Web3 Journey?"
        highlightText="Web3 Journey"
        subtitle="Explore our blog posts, join our community, and take advantage of our premium courses and bootcamps to accelerate your Web3 development skills."
        primaryButtonText="Join Discord Community"
        secondaryButtonText="View All Courses"
        primaryOnClick={handlePrimaryCTA}
        secondaryOnClick={handleSecondaryCTA}
        secondaryIcon={
          <FaDev className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
        }
      />
    </MarketingLayout>
  );
};

export default PageClient;
