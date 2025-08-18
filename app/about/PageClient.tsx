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
import React from "react";

// Client Component for About Page
const PageClient = () => {
  return (
    <MarketingLayout>
      <HeroSection
        tagText="About Us"
        title="What To Know About Dapp Mentors"
        highlightText="Dapp Mentors"
        subtitle="Empowering the next generation of Web3 innovators through education, mentorship, and hands-on support."
      />
      <WhoWeAreSection />
      <MissionSection />
      <OfferingsSection />
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
      <ExpertiseSection />
      <ImpactSection />
    </MarketingLayout>
  );
};

export default PageClient;
