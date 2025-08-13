import ConnectSection from "@/components/about/ConnectSection";
import ExpertiseSection from "@/components/about/ExpertSection";
import HeroSection from "@/components/about/HeroSection";
import ImpactSection from "@/components/about/ImpactSection";
import MissionSection from "@/components/about/MissionSection";
import OfferingsSection from "@/components/about/OfferingsSection";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import React from "react";

// Main About Page Component
const Page = () => {
  return (
    <MarketingLayout>
      <div className="mx-auto space-y-10">
        <HeroSection />
        <WhoWeAreSection />
        <MissionSection />
        <OfferingsSection />
        <ExpertiseSection />
        <ImpactSection />
        <ConnectSection />
      </div>
    </MarketingLayout>
  );
};

export default Page;
