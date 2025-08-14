import MarketingLayout from "@/components/layouts/MarketingLayout";
import BootcampsSection from "@/components/products/BootcampSection";
import CodebasesSection from "@/components/products/CodebasesSection";
import CoursesSection from "@/components/products/CoursesSection";
import EBooksSection from "@/components/products/EBookSection";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import WhyChooseSection from "@/components/shared/WhyChooseSection";

// Main Products Page Component
const Page = () => {
  return (
    <MarketingLayout>
      <HeroSection
        tagText="Our Premium Products"
        title="Level Up Your Skills with Blockchain Mastery"
        highlightText="Blockchain Mastery"
        subtitle="From beginner to pro — get access to the best Web3 courses, codebases, and eBooks to fast-track your success."
      />

      <CoursesSection />
      <BootcampsSection />
      <CodebasesSection />
      <EBooksSection />
      <WhyChooseSection />

      <CTASection
        title="Start Building the Decentralized Future"
        highlightText="Blockchain Mastery"
        subtitle="Whether you're mastering smart contracts, launching a dApp, or accelerating your project with ready-to-use codebases, our products provide the tools you need to succeed."
        primaryButtonText="Explore Our Services"
        secondaryButtonText="Contact Us"
        gradientFrom="from-gray-900"
        gradientTo="to-purple-900"
        darkGradientFrom="dark:from-black"
        darkGradientTo="dark:to-purple-900"
      />
    </MarketingLayout>
  );
};

export default Page;
