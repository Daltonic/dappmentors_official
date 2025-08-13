"use client";

import MarketingLayout from "@/components/layouts/MarketingLayout";
import CommunitySection from "@/components/services/CommunitySection";
import ContactSection from "@/components/services/ContactSection";
import CTASection from "@/components/services/CTASection";
import DeveloperHiringSection from "@/components/services/DeveloperHiringSection";
import EducationSection from "@/components/services/EducationSection";
import HeroSection from "@/components/services/HeroSection";
import MentorshipSection from "@/components/services/MentorshipSection";
import ProfessionalServicesSection from "@/components/services/ProfessionalServicesSection";
import TechnicalWritingSection from "@/components/services/TechnicalWritingSection";
import WhyChooseUsSection from "@/components/services/WhyChooseUsSection";

// Main Page Component
const Page = () => {
  return (
    <MarketingLayout>
      <HeroSection />
      <EducationSection />
      <MentorshipSection />
      <ProfessionalServicesSection />
      <TechnicalWritingSection />
      <DeveloperHiringSection />
      <WhyChooseUsSection />
      <CommunitySection />
      <CTASection />
      <ContactSection />
    </MarketingLayout>
  );
};

export default Page;
