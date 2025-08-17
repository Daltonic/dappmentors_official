"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MarketingLayout from "@/components/layouts/MarketingLayout";

// Types and Interfaces
interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

interface ProductModule {
  title: string;
  duration: string;
  lessons: number;
  description: string;
}

interface ProductTestimonial {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface ProductFAQ {
  question: string;
  answer: string;
}

interface Product {
  id: string;
  type: "Course" | "Bootcamp" | "Ebook" | "Codebase";
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  totalRatings: number;
  studentsEnrolled: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  language: string;
  lastUpdated: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
    credentials: string[];
  };
  features: ProductFeature[];
  modules?: ProductModule[];
  technologies?: string[];
  includes: string[];
  testimonials: ProductTestimonial[];
  faqs: ProductFAQ[];
  videoPreviewUrl?: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

// Sample product data - this would normally come from props or API
const sampleProduct: Product = {
  id: "solidity-masterclass",
  type: "Course",
  title: "Complete Solidity Smart Contract Development Masterclass",
  subtitle: "Master Ethereum Development from Zero to Professional",
  description:
    "Learn to build production-ready smart contracts and dApps with Solidity, covering security best practices, gas optimization, and real-world project development.",
  longDescription:
    "This comprehensive masterclass takes you from absolute beginner to professional Solidity developer. You'll master smart contract development, security patterns, gas optimization techniques, and build real-world decentralized applications. The course includes hands-on projects, code reviews, and direct access to our community of developers.",
  price: 299,
  originalPrice: 499,
  currency: "USD",
  rating: 4.9,
  totalRatings: 1247,
  studentsEnrolled: 5420,
  duration: "40+ hours",
  level: "All Levels",
  language: "English",
  lastUpdated: "January 2025",
  instructor: {
    name: "Darlington Gospel",
    bio: "Senior Blockchain Developer with 8+ years of experience in Solidity, Rust, and DeFi protocols.",
    avatar: "👨‍💻",
    credentials: [
      "Senior Blockchain Developer",
      "Smart Contract Auditor",
      "DeFi Protocol Architect",
    ],
  },
  features: [
    {
      icon: "🚀",
      title: "Production-Ready Skills",
      description:
        "Learn industry-standard practices used by top DeFi protocols",
    },
    {
      icon: "🔒",
      title: "Security-First Approach",
      description:
        "Master smart contract security patterns and common vulnerabilities",
    },
    {
      icon: "⚡",
      title: "Gas Optimization",
      description:
        "Techniques to minimize transaction costs and improve efficiency",
    },
    {
      icon: "🛠️",
      title: "Real-World Projects",
      description: "Build 5+ complete dApps including DeFi, NFTs, and DAOs",
    },
  ],
  modules: [
    {
      title: "Solidity Fundamentals",
      duration: "8 hours",
      lessons: 15,
      description:
        "Master the basics of Solidity syntax, data types, and contract structure",
    },
    {
      title: "Advanced Smart Contracts",
      duration: "12 hours",
      lessons: 22,
      description:
        "Dive deep into inheritance, libraries, and advanced patterns",
    },
    {
      title: "Security & Best Practices",
      duration: "10 hours",
      lessons: 18,
      description: "Learn security vulnerabilities and how to prevent them",
    },
    {
      title: "DeFi Development",
      duration: "15 hours",
      lessons: 25,
      description: "Build decentralized finance applications and protocols",
    },
  ],
  technologies: [
    "Solidity",
    "Hardhat",
    "OpenZeppelin",
    "React",
    "Web3.js",
    "MetaMask",
  ],
  includes: [
    "40+ hours of video content",
    "5 real-world projects",
    "Smart contract templates",
    "Security audit checklist",
    "Lifetime access",
    "Certificate of completion",
    "Private Discord community",
    "Code reviews & feedback",
  ],
  testimonials: [
    {
      name: "Sarah Chen",
      role: "DeFi Developer at Compound",
      rating: 5,
      comment:
        "This course transformed my understanding of Solidity. The security modules alone are worth the price!",
      avatar: "👩‍💻",
    },
    {
      name: "Marcus Johnson",
      role: "Blockchain Consultant",
      rating: 5,
      comment:
        "Excellent practical approach. I landed my first smart contract job after completing this course.",
      avatar: "👨‍💼",
    },
    {
      name: "Elena Rodriguez",
      role: "Full Stack Developer",
      rating: 5,
      comment:
        "Clear explanations, great projects, and fantastic community support. Highly recommended!",
      avatar: "👩‍🔬",
    },
  ],
  faqs: [
    {
      question: "Do I need prior blockchain experience?",
      answer:
        "No! This course starts from the absolute basics and gradually builds up to advanced concepts. We cover everything you need to know.",
    },
    {
      question: "What if I get stuck on a concept?",
      answer:
        "You'll have access to our private Discord community where you can ask questions and get help from instructors and fellow students.",
    },
    {
      question: "How long do I have access to the course?",
      answer:
        "You get lifetime access to all course materials, including future updates and new content additions.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Yes! We offer a 30-day money-back guarantee if you're not satisfied with the course content.",
    },
  ],
  imageUrl: "/course-preview.jpg",
  category: "Smart Contracts",
  tags: ["Solidity", "Ethereum", "DeFi", "Security", "Best Practices"],
};

// Particle animation component (similar to your existing design)
type Particle = {
  top: string;
  left: string;
  color: string;
  baseSize: number;
  duration: number;
  xAmp: number;
  yAmp: number;
  scaleMax: number;
  scaleMin: number;
  opacityBase: number;
  opacityDelta: number;
  delay: number;
};

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleCount = 15;
  const colorPalette = ["#D2145A", "#FF4081", "#a855f7"];

  useEffect(() => {
    const generatedParticles = Array.from({ length: particleCount }).map(() => {
      const duration = 12 + Math.random() * 8;
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        baseSize: Math.random() * 6 + 3,
        duration,
        xAmp: (Math.random() - 0.5) * 30,
        yAmp: (Math.random() - 0.5) * 30,
        scaleMax: 1 + Math.random() * 0.4,
        scaleMin: 0.8 + Math.random() * 0.2,
        opacityBase: 0.15 + Math.random() * 0.15,
        opacityDelta: Math.random() * 0.08,
        delay: Math.random() * 4,
      };
    });
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: p.baseSize,
            height: p.baseSize,
            backgroundColor: p.color,
            borderRadius: "50%",
          }}
          animate={{
            x: [0, p.xAmp, 0, -p.xAmp, 0],
            y: [0, p.yAmp, 0, -p.yAmp, 0],
            scale: [1, p.scaleMax, 1, p.scaleMin, 1],
            opacity: [
              p.opacityBase,
              p.opacityBase + p.opacityDelta,
              p.opacityBase,
              p.opacityBase - p.opacityDelta,
              p.opacityBase,
            ],
          }}
          transition={{
            duration: p.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// Hero Section Component
interface ProductHeroProps {
  product: Product;
  onEnroll: () => void;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product, onEnroll }) => {
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 py-20 lg:py-32 overflow-hidden">
      <ParticleBackground />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            {/* Product Type Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
                {product.type}
              </span>
              <div className="w-2 h-2 bg-[#D2145A] rounded-full animate-pulse" />
            </div>

            {/* Title */}
            <h1 className="font-cambo text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 dark:text-white mb-6 leading-tight">
              {product.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {product.subtitle}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(product.rating) ? "★" : "☆"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {product.rating} ({product.totalRatings.toLocaleString()}{" "}
                  reviews)
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {product.studentsEnrolled.toLocaleString()} students
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {product.duration}
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </div>
              {product.originalPrice && (
                <>
                  <div className="text-2xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </div>
                  <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {discountPercentage}% OFF
                  </div>
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onEnroll}
                className="group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center justify-center gap-2">
                  Enroll Now
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
              <button className="group bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 border-[#FF4081]/50 dark:border-white/30 text-[#D2145A] dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white">
                Preview Course
              </button>
            </div>
          </div>

          {/* Course Preview/Image */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-3xl flex items-center justify-center text-6xl shadow-2xl">
              📹
            </div>
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 rounded-full text-sm font-semibold">
              HD Video
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section
interface FeaturesProps {
  features: ProductFeature[];
}

const FeaturesSection: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            What You&apos;ll Master
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive learning experience designed to transform you into a
            professional developer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Course Content/Modules Section
interface CourseContentProps {
  modules?: ProductModule[];
  includes: string[];
}

const CourseContentSection: React.FC<CourseContentProps> = ({
  modules,
  includes,
}) => {
  const [activeModule, setActiveModule] = useState<number>(0);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Course Content
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Structured learning path with hands-on projects and real-world
            applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Modules */}
          {modules && modules.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Course Modules
              </h3>
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      activeModule === index
                        ? "bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 border-2 border-[#D2145A]/30"
                        : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
                    }`}
                    onClick={() => setActiveModule(index)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {module.title}
                      </h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {module.duration}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {module.description}
                    </p>
                    <div className="text-sm text-[#D2145A] font-medium">
                      {module.lessons} lessons
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Included */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              What&apos;s Included
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="space-y-4">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
interface TestimonialsProps {
  testimonials: ProductTestimonial[];
}

const TestimonialsSection: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            What Students Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of successful developers who transformed their
            careers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                &quot;{testimonial.comment}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
interface FAQProps {
  faqs: ProductFAQ[];
}

const FAQSection: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about this course
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-gray-900 dark:text-white text-lg">
                  {faq.question}
                </span>
                <span
                  className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Instructor Section
interface InstructorProps {
  instructor: Product["instructor"];
}

const InstructorSection: React.FC<InstructorProps> = ({ instructor }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Meet Your Instructor
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-32 h-32 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-3xl flex items-center justify-center text-6xl mx-auto lg:mx-0 mb-8">
              {instructor.avatar}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center lg:text-left">
              {instructor.name}
            </h3>
            <div className="space-y-2 mb-6">
              {instructor.credentials.map((credential, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-2 h-2 bg-[#D2145A] rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {credential}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {instructor.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
interface FinalCTAProps {
  product: Product;
  onEnroll: () => void;
}

const FinalCTASection: React.FC<FinalCTAProps> = ({ product, onEnroll }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <ParticleBackground />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-cambo font-normal text-white mb-8">
          Ready to Transform Your Career?
        </h2>

        <p className="text-xl text-white/90 mb-12 leading-relaxed">
          Join {product.studentsEnrolled.toLocaleString()}+ students who are
          already building the future with blockchain technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">✓</span>
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">✓</span>
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span className="text-2xl">✓</span>
            <span>Expert support</span>
          </div>
        </div>

        <button
          onClick={onEnroll}
          className="group bg-white text-[#D2145A] px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <span className="flex items-center gap-3">
            Enroll Now - ${product.price}
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
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
      </div>
    </section>
  );
};

// Additional utility functions for different product types
export const getProductTypeIcon = (type: Product["type"]): string => {
  switch (type) {
    case "Course":
      return "🎓";
    case "Bootcamp":
      return "🚀";
    case "Ebook":
      return "📚";
    case "Codebase":
      return "💻";
    default:
      return "📦";
  }
};

export const getProductTypeDescription = (type: Product["type"]): string => {
  switch (type) {
    case "Course":
      return "Comprehensive video-based learning experience";
    case "Bootcamp":
      return "Intensive, hands-on training program";
    case "Ebook":
      return "In-depth written guide and reference";
    case "Codebase":
      return "Production-ready code templates and frameworks";
    default:
      return "Premium educational content";
  }
};

// Hook for product-specific features
export const useProductFeatures = (type: Product["type"]) => {
  const baseFeatures = [
    {
      icon: "💻",
      title: "Expert Instruction",
      description:
        "Learn from industry professionals with real-world experience",
    },
    {
      icon: "🎯",
      title: "Practical Focus",
      description: "Build real projects and gain hands-on experience",
    },
  ];

  const typeSpecificFeatures = {
    Course: [
      {
        icon: "🎥",
        title: "HD Video Content",
        description: "High-quality video lessons with clear explanations",
      },
      {
        icon: "📱",
        title: "Mobile Learning",
        description: "Access your content anywhere, anytime",
      },
    ],
    Bootcamp: [
      {
        icon: "👥",
        title: "Live Sessions",
        description: "Interactive live classes with direct instructor access",
      },
      {
        icon: "🏆",
        title: "Career Support",
        description: "Job placement assistance and career guidance",
      },
    ],
    Ebook: [
      {
        icon: "📖",
        title: "Comprehensive Guide",
        description: "Detailed written content with practical examples",
      },
      {
        icon: "💾",
        title: "Multiple Formats",
        description: "Available in PDF, ePub, and other formats",
      },
    ],
    Codebase: [
      {
        icon: "⚡",
        title: "Production Ready",
        description: "Battle-tested code ready for immediate deployment",
      },
      {
        icon: "📋",
        title: "Documentation",
        description: "Complete setup guides and API documentation",
      },
    ],
  };

  return [...baseFeatures, ...typeSpecificFeatures[type]];
};

// Main Product Details Page Component
interface ProductDetailsPageProps {
  product?: Product;
}

const Page: React.FC<ProductDetailsPageProps> = ({
  product = sampleProduct,
}) => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    // Simulate enrollment process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would typically:
    // 1. Process payment
    // 2. Create user enrollment
    // 3. Send confirmation email
    // 4. Redirect to course dashboard

    console.log(`Enrolling in: ${product.title}`);
    alert(`Successfully enrolled in ${product.title}!`);
    setIsEnrolling(false);
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: product.title,
    description: product.description,
    provider: {
      "@type": "Organization",
      name: "Dapp Mentors",
    },
    instructor: {
      "@type": "Person",
      name: product.instructor.name,
      description: product.instructor.bio,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      ratingCount: product.totalRatings,
    },
  };

  return (
    <MarketingLayout>
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <ProductHero product={product} onEnroll={handleEnroll} />

      {/* Features Section */}
      <FeaturesSection features={product.features} />

      {/* Course Content Section */}
      <CourseContentSection
        modules={product.modules}
        includes={product.includes}
      />

      {/* Instructor Section */}
      <InstructorSection instructor={product.instructor} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={product.testimonials} />

      {/* FAQ Section */}
      <FAQSection faqs={product.faqs} />

      {/* Final CTA Section */}
      <FinalCTASection product={product} onEnroll={handleEnroll} />

      {/* Sticky Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 md:hidden z-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </div>
            )}
          </div>
          <button
            onClick={handleEnroll}
            disabled={isEnrolling}
            className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isEnrolling && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-[#D2145A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Processing Enrollment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Please wait while we set up your access...
            </p>
          </div>
        </div>
      )}
    </MarketingLayout>
  );
};

// Export the component
export default Page;
