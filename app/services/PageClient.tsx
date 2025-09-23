// app/services/page.tsx
"use client";

import MarketingLayout from "@/components/layouts/MarketingLayout";
import DeveloperHiringSection from "@/components/services/DeveloperHiringSection";
import EducationSection from "@/components/services/EducationSection";
import MentorshipSection from "@/components/services/MentorshipSection";
import ProfessionalServicesSection from "@/components/services/ProfessionalServicesSection";
import TechnicalWritingSection from "@/components/services/TechnicalWritingSection";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import WhyChooseSection from "@/components/shared/WhyChooseSection";
import { Service } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import React from "react";

interface PageClientProps {
  services: Service[];
}

const PageClient = ({ services }: PageClientProps) => {
  const router = useRouter();
  const educationServices = services.filter(
    (service) => service.type === "Education",
  );
  const mentorshipServices = services.filter(
    (service) => service.type === "Mentorship",
  );
  const professionalServices = services.filter(
    (service) => service.type === "Professional",
  );
  const writingServices = services.filter(
    (service) => service.type === "Writing",
  );
  const hiringServices = services.filter(
    (service) => service.type === "Hiring",
  );

  // CTA Actions
  const handlePrimaryCTA = () => {
    router.push("/contact");
  };

  const handleSecondaryCTA = () => {
    // Since it's already on services, perhaps loop back or to products; here, redirect to products for related action
    router.push("/products");
  };

  return (
    <MarketingLayout>
      <HeroSection
        tagText="Our Services"
        title="Empowering Your Web3 Journey with Expert Solutions"
        highlightText="Web3 Journey"
        subtitle="From hands-on education to professional development, we provide the tools, expertise, and support to bring your Web3 vision to life."
      />
      <EducationSection services={educationServices} />
      <MentorshipSection services={mentorshipServices} />
      <ProfessionalServicesSection services={professionalServices} />
      <TechnicalWritingSection services={writingServices} />
      <DeveloperHiringSection services={hiringServices} />
      <WhyChooseSection />
      <CTASection
        title="Ready to Start Your Web3 Journey?"
        highlightText="Web3 Journey"
        subtitle="Whether you're looking to master blockchain development, launch a groundbreaking dApp, or hire top Web3 talent, we're here to make it happen. Get Started Today"
        primaryButtonText="Get Started Today"
        secondaryButtonText="Browse Our Products"
        primaryOnClick={handlePrimaryCTA}
        secondaryOnClick={handleSecondaryCTA}
      />
    </MarketingLayout>
  );
};

export default PageClient;
