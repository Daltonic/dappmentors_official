"use client";

import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactMethodsSection from "@/components/contact/ContactMethodsSection";
import FAQSection from "@/components/contact/FAQSection";
import MentorshipSection from "@/components/contact/MentorshipSection";
import ServicesSection from "@/components/contact/ServicesSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";

// Main Contact Page Component
const Page = () => {
  return (
    <MarketingLayout>
      <HeroSection
        tagText="Contact Us"
        title="Let's Build the Decentralized Future Together"
        highlightText="Decentralized Future"
        subtitle="Whether you have questions about our tutorials, want to join our Academy, or need professional Web3 development services, we'd love to hear from you!"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <span className="flex items-center gap-2">
              Get In Touch
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
          <button className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-[#D2145A] text-[#D2145A] px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-[#D2145A] hover:text-white">
            Book Mentorship
          </button>
        </div>
      </HeroSection>
      <ContactMethodsSection />
      <ContactFormSection />
      <MentorshipSection />
      <ServicesSection />
      <FAQSection />
      <CTASection
        title="Ready to Start Your Web3 Journey?"
        highlightText="Web3 Journey"
        subtitle="Join thousands of developers who have transformed their careers with Dapp Mentors. Let's build the decentralized applications of tomorrow, together."
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

export default Page;
