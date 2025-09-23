// app/contact/page.tsx
"use client";

import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactMethodsSection from "@/components/contact/ContactMethodsSection";
import MentorshipSection from "@/components/contact/MentorshipSection";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import CTASection from "@/components/shared/CTASection";
import FAQSection from "@/components/shared/FAQSection";
import HeroSection from "@/components/shared/HeroSection";
import { FAQs } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const faqs: FAQs[] = [
  {
    question: "How quickly do you respond to inquiries?",
    answer:
      "We aim to respond within 24-48 hours for email inquiries, and provide real-time responses in our Discord community.",
  },
  {
    question: "What blockchain ecosystems do you specialize in?",
    answer:
      "We have expertise in Solana, Alephium, Sia, ICP Bitfinity, and Ethereum, with projects ranging from crowdfunding dApps to decentralized storage systems.",
  },
  {
    question: "Do you offer beginner-friendly content?",
    answer:
      "Absolutely! Our tutorials and courses are designed for all levels, from complete beginners to advanced practitioners. We provide clear learning paths for everyone.",
  },
  {
    question: "Can you help with existing projects?",
    answer:
      "Yes! We offer debugging services, code reviews, and guidance for existing Web3 projects through our mentorship programs.",
  },
  {
    question: "What's included in the Academy membership?",
    answer:
      "Academy members get access to premium courses, exclusive books, video content, and in-depth learning materials on DeFi, NFTs, and decentralized storage solutions.",
  },
];

// Client Component for Contact Page
const PageClient = () => {
  const router = useRouter(); // Initialize router for navigation

  // Function to scroll to the WhyChooseSection
  const scrollToWhyChooseSection = () => {
    const contactFormSection = document.getElementById("contact-form-section");
    if (contactFormSection) {
      contactFormSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // CTA Actions
  const handlePrimaryCTA = () => {
    router.push("/products");
  };

  const handleSecondaryCTA = () => {
    window.open("https://discord.gg/PgFDUVT6n9", "_blank");
  };

  return (
    <MarketingLayout>
      <HeroSection
        tagText="Contact Us"
        title="Let's Build the Decentralized Future Together"
        highlightText="Decentralized Future"
        subtitle="Whether you have questions about our tutorials, want to join our Academy, or need professional Web3 development services, we'd love to hear from you!"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToWhyChooseSection}
            className="group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <span className="flex items-center gap-2">
              Get In Touch
              <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
          <button
            onClick={() => router.push("/services")}
            className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-[#D2145A] text-[#D2145A] px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-[#D2145A] hover:text-white"
          >
            Our Services
          </button>
        </div>
      </HeroSection>
      <ContactMethodsSection />
      <div id="contact-form-section">
        <ContactFormSection />
      </div>
      <MentorshipSection />
      <FAQSection
        subtitle="Quick answers to common questions about our services and community"
        faqs={faqs}
      />
      <CTASection
        title="Ready to Start Your Web3 Journey?"
        highlightText="Web3 Journey"
        subtitle="Join thousands of developers who have transformed their careers with Dapp Mentors. Let's build the decentralized applications of tomorrow, together."
        primaryButtonText="Start Learning Today"
        secondaryButtonText="Join Community"
        primaryOnClick={handlePrimaryCTA}
        secondaryOnClick={handleSecondaryCTA}
      />
    </MarketingLayout>
  );
};

export default PageClient;
