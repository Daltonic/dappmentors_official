"use client";

import MarketingLayout from "@/components/layouts/MarketingLayout";
import BootcampsSection from "@/components/products/BootcampSection";
import CodebasesSection from "@/components/products/CodebasesSection";
import CoursesSection from "@/components/products/CoursesSection";
import EBooksSection from "@/components/products/EBookSection";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import WhyChooseSection from "@/components/shared/WhyChooseSection";
import { Product } from "@/utils/interfaces";

interface PageClientProps {
  products: Product[];
}

const PageClient = ({ products }: PageClientProps) => {
  const Courses = products.filter((product) => product.type === "Course");
  const Bootcamps = products.filter((product) => product.type === "Bootcamp");
  const Codebases = products.filter((product) => product.type === "Codebase");
  const EBooks = products.filter((product) => product.type === "Ebook");

  return (
    <MarketingLayout>
      <HeroSection
        tagText="Our Premium Products"
        title="Level Up Your Skills with Blockchain Mastery"
        highlightText="Blockchain Mastery"
        subtitle="From beginner to pro — get access to the best Web3 courses, codebases, and eBooks to fast-track your success."
      />

      <CoursesSection products={Courses} />
      <BootcampsSection products={Bootcamps} />
      <CodebasesSection products={Codebases} />
      <EBooksSection products={EBooks} />
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

export default PageClient;
