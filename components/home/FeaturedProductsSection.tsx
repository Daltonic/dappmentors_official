"use client";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SkeletonTheme } from "react-loading-skeleton";
import Image from "next/image";

interface ProductProp {
  title: string;
  description: string;
  type: string;
  duration: string;
  level: string;
  price: string;
  image: string;
  imageSrc: string;
  alt: string;
  gradient: string;
  features: string[];
}

const FeaturedProductsSection = () => {
  const [loading, setLoading] = useState(true);

  const products: ProductProp[] = [
    {
      title: "Solana dApp Development Bootcamp",
      description:
        "Build a complete crowdfunding platform in 6 weeks with hands-on instruction. Master Rust, Anchor, and React integration.",
      type: "Bootcamp",
      duration: "6 weeks",
      level: "Intermediate",
      price: "$299",
      image: "🚀",
      imageSrc: "/assets/images/products/01_solana_thumbnail.jpg",
      alt: "Solana dApp Development Bootcamp",
      gradient: "from-purple-500 to-indigo-500",
      features: [
        "Live Sessions",
        "1-on-1 Mentoring",
        "Project Portfolio",
        "Certificate",
      ],
    },
    {
      title: "Solidity for Smart Contract Development",
      description:
        "Master Ethereum smart contract development with comprehensive modules covering security, testing, and deployment.",
      type: "Course",
      duration: "4 weeks",
      level: "Beginner",
      price: "$199",
      image: "⚡",
      imageSrc: "/assets/images/products/02_ethereum_thumbnail.jpg",
      alt: "Solidity Smart Contract Development Course",
      gradient: "from-yellow-500 to-orange-500",
      features: [
        "Self-paced",
        "Code Examples",
        "Assignments",
        "Community Access",
      ],
    },
    {
      title: "Decentralized Storage Mastery",
      description:
        "Learn IPFS, Filecoin, and Sia integration for scalable, decentralized data storage solutions in your dApps.",
      type: "eBook + Course",
      duration: "2 weeks",
      level: "Intermediate",
      price: "$149",
      image: "🗄️",
      imageSrc: "/assets/images/products/03_filecoin_thumbnail.jpg",
      alt: "Decentralized Storage Mastery Course",
      gradient: "from-green-500 to-emerald-500",
      features: ["PDF Guide", "Video Tutorials", "Code Repository", "Updates"],
    },
    {
      title: "DeFi Protocol Development",
      description:
        "Build advanced DeFi protocols with yield farming, liquidity pools, and governance mechanisms.",
      type: "Advanced Course",
      duration: "8 weeks",
      level: "Advanced",
      price: "$399",
      image: "💰",
      imageSrc: "/assets/images/products/04_defi_thumbnail.jpg",
      alt: "DeFi Protocol Development Course",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Advanced Projects",
        "Real Protocols",
        "Gas Optimization",
        "Security Audits",
      ],
    },
    {
      title: "NFT Marketplace Creation",
      description:
        "Create and deploy your own NFT marketplace with advanced features like royalties and lazy minting.",
      type: "Project Course",
      duration: "5 weeks",
      level: "Intermediate",
      price: "$249",
      image: "🎨",
      imageSrc: "/assets/images/products/05_nft_thumbnail.jpg",
      alt: "NFT Marketplace Creation Course",
      gradient: "from-pink-500 to-rose-500",
      features: [
        "Full Stack",
        "IPFS Integration",
        "Smart Contracts",
        "Frontend UI",
      ],
    },
    {
      title: "Web3 Security Fundamentals",
      description:
        "Learn to identify and prevent common vulnerabilities in smart contracts and dApps.",
      type: "Security Course",
      duration: "3 weeks",
      level: "Intermediate",
      price: "$179",
      image: "🔐",
      imageSrc: "/assets/images/products/06_security_thumbnail.jpg",
      alt: "Web3 Security Fundamentals Course",
      gradient: "from-red-500 to-orange-500",
      features: [
        "Vulnerability Testing",
        "Audit Tools",
        "Best Practices",
        "Case Studies",
      ],
    },
  ];

  const shouldAutoScroll = products.length > 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Premium Products
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Master Web3 with Ease
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Carefully crafted products that empower you to learn and build at
            your own pace, from beginner tutorials to advanced bootcamps.
          </p>
        </div>

        {/* Custom Pagination Styles */}
        <style jsx global>{`
          .desktop-pagination .swiper-pagination-bullet,
          .mobile-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #d1d5db;
            opacity: 1;
            margin: 0 4px;
            transition: all 0.3s ease;
          }

          .desktop-pagination .swiper-pagination-bullet-active,
          .mobile-pagination .swiper-pagination-bullet-active {
            background: #d2145a;
            width: 32px;
            border-radius: 6px;
          }

          .dark .desktop-pagination .swiper-pagination-bullet,
          .dark .mobile-pagination .swiper-pagination-bullet {
            background: #4b5563;
          }

          .dark .desktop-pagination .swiper-pagination-bullet-active,
          .dark .mobile-pagination .swiper-pagination-bullet-active {
            background: #d2145a;
          }

          .desktop-prev:hover svg,
          .desktop-next:hover svg {
            color: white !important;
          }
        `}</style>

        {/* Products Container */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
              {Array.from({ length: Math.min(products.length, 3) }).map(
                (_, i) => (
                  <SkeletonTheme
                    key={i}
                    baseColor="#202020"
                    highlightColor="#444"
                    borderRadius={8}
                  >
                    <div className="w-full max-w-[380px] h-[600px] rounded-3xl bg-gray-800" />
                  </SkeletonTheme>
                ),
              )}
            </div>
          ) : (
            <>
              {/* Desktop/Tablet View with Swiper */}
              <div className="hidden md:block">
                <div className="mb-16">
                  <Swiper
                    autoplay={
                      shouldAutoScroll
                        ? {
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                          }
                        : false
                    }
                    pagination={{
                      clickable: true,
                      el: ".desktop-pagination",
                    }}
                    navigation={{
                      enabled: shouldAutoScroll,
                      nextEl: ".desktop-next",
                      prevEl: ".desktop-prev",
                    }}
                    loop={shouldAutoScroll}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mb-8"
                    spaceBetween={20}
                    breakpoints={{
                      768: {
                        slidesPerView:
                          products.length >= 2 ? 2 : products.length,
                        spaceBetween: 24,
                      },
                      1024: {
                        slidesPerView: Math.min(3, products.length),
                        spaceBetween: 28,
                      },
                      1280: {
                        slidesPerView: Math.min(3, products.length),
                        spaceBetween: 32,
                      },
                    }}
                  >
                    {products.map((product, index) => (
                      <SwiperSlide key={index} className="!flex justify-center">
                        <ProductCard product={product} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Desktop Navigation and Pagination */}
                  <div className="flex items-center justify-between">
                    {/* Navigation Arrows */}
                    {shouldAutoScroll && (
                      <div className="flex items-center gap-4">
                        <button className="desktop-prev w-12 h-12 rounded-full bg-white dark:bg-gray-700 border-2 border-[#D2145A] flex items-center justify-center hover:bg-[#D2145A] hover:text-white transition-all duration-300 shadow-lg">
                          <svg
                            className="w-5 h-5 text-[#D2145A] hover:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button className="desktop-next w-12 h-12 rounded-full bg-white dark:bg-gray-700 border-2 border-[#D2145A] flex items-center justify-center hover:bg-[#D2145A] hover:text-white transition-all duration-300 shadow-lg">
                          <svg
                            className="w-5 h-5 text-[#D2145A] hover:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Pagination */}
                    <div className="desktop-pagination flex items-center justify-center gap-2 ml-auto">
                      {/* Pagination bullets will be rendered here by Swiper */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View with Auto-scroll */}
              <div className="block md:hidden">
                <div className="mb-12">
                  <Swiper
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    pagination={{
                      clickable: true,
                      el: ".mobile-pagination",
                    }}
                    navigation={false}
                    loop={true}
                    modules={[Autoplay, Pagination]}
                    className="mb-8"
                    spaceBetween={16}
                    slidesPerView={1}
                  >
                    {products.map((product, index) => (
                      <SwiperSlide key={index} className="!flex justify-center">
                        <ProductCard product={product} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Mobile Pagination */}
                  <div className="mobile-pagination flex items-center justify-center gap-2">
                    {/* Pagination bullets will be rendered here by Swiper */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              View All Products
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
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

// ProductCard component with thumbnail image
const ProductCard = ({ product }: { product: ProductProp }) => (
  <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent w-full max-w-[380px]">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
    ></div>

    <div className="relative z-10">
      {/* Thumbnail Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="rounded-t-3xl group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

        {/* Floating Icon */}
        <div
          className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
        >
          {product.image}
        </div>

        {/* Product Type Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {product.type}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-[#D2145A] transition-colors duration-300 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
          {product.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">⏱️</span>
            <span className="text-gray-600 dark:text-gray-300">
              {product.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📈</span>
            <span className="text-gray-600 dark:text-gray-300">
              {product.level}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {product.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#D2145A] rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {product.price}
          </div>
          <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 text-sm sm:text-base">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedProductsSection;
