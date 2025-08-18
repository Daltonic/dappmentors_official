"use client";

import ServicesSection from "@/components/contact/ServicesSection";
import FeaturedContentSection from "@/components/home/FeaturedContentSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import RecentBlogsSection from "@/components/home/RecentBlogsSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import CommunityStatsSection from "@/components/shared/CommunityStatsSection";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import WhyChooseSection from "@/components/shared/WhyChooseSection";
import React from "react";

// Client Component for Home Page
const PageClient = () => {
  return (
    <MarketingLayout>
      <HeroSection
        tagText="Blockchain Academy"
        title="Our Gateway to Web3 Success"
        highlightText="Blockchain Academy"
        subtitle="Build, Master, and Thrive in the Decentralized Future. Join 5,450+ developers learning blockchain development with expert-led courses, bootcamps, and hands-on projects."
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
            Start Learning Today
          </button>
          <button className="border-2 border-[#D2145A] text-[#D2145A] hover:bg-[#D2145A] hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105">
            Browse Courses
          </button>
        </div>
        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <span className="font-semibold">5,450+ Community Members</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-semibold">8+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-semibold">150+ Tutorials</span>
          </div>
        </div>
      </HeroSection>
      <WhyChooseSection />
      <FeaturedProductsSection />
      <ServicesSection />
      <FeaturedContentSection />
      <CommunityStatsSection />
      <RecentBlogsSection />
      <CTASection
        title="Ready to Shape the Decentralized Future?"
        highlightText="Decentralized Future"
        subtitle="Whether you're a beginner exploring Web3 or a seasoned developer launching a dApp, we have the resources, expertise, and community to support you."
        primaryButtonText="Start Learning Today"
        secondaryButtonText="Join Discord Community"
        gradientFrom="from-gray-900"
        gradientTo="to-purple-900"
        darkGradientFrom="dark:from-black"
        darkGradientTo="dark:to-purple-900"
      />
    </MarketingLayout>
  );
};

export default PageClient;
