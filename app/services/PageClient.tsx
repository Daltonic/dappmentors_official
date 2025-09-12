"use client";

import MarketingLayout from "@/components/layouts/MarketingLayout";
import DeveloperHiringSection from "@/components/services/DeveloperHiringSection";
import EducationSection from "@/components/services/EducationSection";
import MentorshipSection from "@/components/services/MentorshipSection";
import ProfessionalServicesSection from "@/components/services/ProfessionalServicesSection";
import QuoteModal from "@/components/services/QuoteModal";
import TechnicalWritingSection from "@/components/services/TechnicalWritingSection";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import WhyChooseSection from "@/components/shared/WhyChooseSection";
import { Service } from "@/utils/interfaces";
import React, { useState } from "react";

// Client Component for Services Page
const PageClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleGetQuote = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <MarketingLayout>
      <HeroSection
        tagText="Our Services"
        title="Empowering Your Web3 Journey with Expert Solutions"
        highlightText="Web3 Journey"
        subtitle="From hands-on education to professional development, we provide the tools, expertise, and support to bring your Web3 vision to life."
      />
      <EducationSection onGetQuote={handleGetQuote} />
      <MentorshipSection onGetQuote={handleGetQuote} />
      <ProfessionalServicesSection onGetQuote={handleGetQuote} />
      <TechnicalWritingSection onGetQuote={handleGetQuote} />
      <DeveloperHiringSection onGetQuote={handleGetQuote} />
      <WhyChooseSection />
      <CTASection
        title="Ready to Start Your Web3 Journey?"
        highlightText="Web3 Journey"
        subtitle="Whether you're looking to master blockchain development, launch a groundbreaking dApp, or hire top Web3 talent, we're here to make it happen. Get Started Today"
        primaryButtonText="Get Started Today"
        secondaryButtonText="View All Services"
        gradientFrom="from-gray-900"
        gradientTo="to-purple-900"
        darkGradientFrom="dark:from-black"
        darkGradientTo="dark:to-purple-900"
      />
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </MarketingLayout>
  );
};

export default PageClient;
