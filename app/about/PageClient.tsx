// app/about/AboutPageClient.tsx
"use client";

import ExpertiseSection from "@/components/about/ExpertSection";
import ImpactSection from "@/components/about/ImpactSection";
import MissionSection from "@/components/about/MissionSection";
import OfferingsSection from "@/components/about/OfferingsSection";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import { useRouter } from "next/navigation";
import React from "react";

// Client Component for About Page
const PageClient = () => {
  const router = useRouter(); // Initialize router for navigation

  // Function to scroll to the WhyChooseSection
  const scrollToWhyChooseSection = () => {
    const offeringsSection = document.getElementById("offerings-section");
    if (offeringsSection) {
      offeringsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MarketingLayout>
      <HeroSection
        tagText="About Us"
        title="What To Know About Dapp Mentors"
        highlightText="Dapp Mentors"
        subtitle="Empowering the next generation of Web3 innovators through education, mentorship, and hands-on support."
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={scrollToWhyChooseSection}
            className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            Our Offerings
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="border-2 border-[#D2145A] text-[#D2145A] hover:bg-[#D2145A] hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </HeroSection>
      <WhoWeAreSection />
      <MissionSection />
      <div id="offerings-section">
        <OfferingsSection />
      </div>
      <ImpactSection />
      <ExpertiseSection />
      <CTASection
        title="Join the Decentralized Future"
        highlightText="Decentralized"
        subtitle="Dapp Mentors is more than just a learning platform—it's a movement to empower developers to shape the future of the internet. Join our community today and start building the decentralized applications of tomorrow."
        primaryButtonText="Start Learning Today"
        secondaryButtonText="Join Community"
        gradientFrom="from-gray-900"
        gradientTo="to-purple-900"
        darkGradientFrom="dark:from-black"
        darkGradientTo="dark:to-purple-900"
      />
    </MarketingLayout>
  );
};

export default PageClient;
