"use client";

import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactMethodsSection from "@/components/contact/ContactMethodsSection";
import CTASection from "@/components/contact/CTASection";
import FAQSection from "@/components/contact/FAQSection";
import HeroSection from "@/components/contact/HeroSection";
import MentorshipSection from "@/components/contact/MentorshipSection";
import ServicesSection from "@/components/contact/ServicesSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";

// Main Contact Page Component
const Page = () => {
  return (
    <MarketingLayout>
      <HeroSection />
      <ContactMethodsSection />
      <ContactFormSection />
      <MentorshipSection />
      <ServicesSection />
      <FAQSection />
      <CTASection />
    </MarketingLayout>
  );
};

export default Page;
