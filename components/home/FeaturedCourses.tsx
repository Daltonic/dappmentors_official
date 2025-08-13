"use client";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SkeletonTheme } from "react-loading-skeleton";
import Image from "next/image";
import Button from "../shared/Button";

interface CourseProp {
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  alt: string;
}

const FeaturedCourses = () => {
  const [loading, setLoading] = useState(true);

  const featuredCourses = [
    {
      title: "Introduction to Web3 Development",
      description: "Learn blockchain fundamentals and smart contract creation.",
      price: 49,
      imageSrc: "/images/home/Content.png",
      alt: "Web3 Development Course",
    },
    {
      title: "AI and Blockchain Integration",
      description: "Master AI algorithms with blockchain for innovative apps.",
      price: 79,
      imageSrc: "/images/home/Content(1).png",
      alt: "AI Blockchain Course",
    },
    {
      title: "Decentralized App Development",
      description: "Build dApps with hands-on project support.",
      price: 99,
      imageSrc: "/images/home/Content 2.png",
      alt: "dApp Development Course",
    },
    {
      title: "Advanced Smart Contracts",
      description: "Deep dive into secure, scalable blockchain solutions.",
      price: 129,
      imageSrc: "/images/home/Content.png",
      alt: "Advanced Smart Contracts Course",
    },
    // Add more courses to demonstrate auto-scroll
    {
      title: "DeFi Protocol Development",
      description: "Build decentralized finance applications and protocols.",
      price: 159,
      imageSrc: "/images/home/Content(1).png",
      alt: "DeFi Protocol Course",
    },
    {
      title: "NFT Marketplace Creation",
      description: "Create and deploy your own NFT marketplace platform.",
      price: 189,
      imageSrc: "/images/home/Content 2.png",
      alt: "NFT Marketplace Course",
    },
  ];

  const shouldAutoScroll = featuredCourses.length > 4;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full bg-white dark:bg-medium py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 dark:animate-pulse">
            <p className="text-[#D2145A] font-inter font-semibold text-xs sm:text-sm md:text-base uppercase">
              Featured Courses
            </p>
            <div className="w-8 sm:w-12 md:w-16 border border-[#FFBAD4]"></div>
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

          <h2 className="font-cambo font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
            Discover Our Top Web3 Courses
          </h2>

          <p className="font-inter text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto px-4">
            Explore a range of courses designed to empower you in decentralized
            technologies, with hands-on project support.
          </p>
        </div>

        {/* Courses Container */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
              {Array.from({ length: Math.min(featuredCourses.length, 4) }).map(
                (_, i) => (
                  <SkeletonTheme
                    key={i}
                    baseColor="#202020"
                    highlightColor="#444"
                    borderRadius={8}
                  >
                    <div className="w-full max-w-[280px] sm:max-w-[300px] h-[350px] sm:h-[400px] rounded-lg bg-gray-800" />
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
                            delay: 3000,
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
                          featuredCourses.length >= 2
                            ? 2
                            : featuredCourses.length,
                        spaceBetween: 24,
                      },
                      1024: {
                        slidesPerView: Math.min(3, featuredCourses.length),
                        spaceBetween: 28,
                      },
                      1280: {
                        slidesPerView: Math.min(4, featuredCourses.length),
                        spaceBetween: 32,
                      },
                    }}
                  >
                    {featuredCourses.map((course, index) => (
                      <SwiperSlide key={index} className="!flex justify-center">
                        <CourseCard course={course} />
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

              {/* Mobile/Tablet View with Auto-scroll */}
              <div className="block md:hidden">
                <div className="mb-12">
                  <Swiper
                    autoplay={{
                      delay: 3000,
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
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 16,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                    }}
                  >
                    {featuredCourses.map((course, index) => (
                      <SwiperSlide key={index} className="!flex justify-center">
                        <CourseCard course={course} />
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
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8 sm:mt-12">
        <button className="bg-[#D2145A] text-white hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base">
          View All Courses
        </button>
      </div>
    </section>
  );
};

// Extracted CourseCard component for better organization
const CourseCard = ({ course }: { course: CourseProp }) => (
  <div className="w-full max-w-[280px] sm:max-w-[300px] bg-white dark:bg-[#2A2A2A] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
    {/* Image Section */}
    <div className="relative h-48 sm:h-52 overflow-hidden">
      <Image
        src={course.imageSrc}
        alt={course.alt}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
        className="rounded-t-lg group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
    </div>

    {/* Content Section */}
    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#D2145A] dark:group-hover:text-[#D2145A] transition-colors duration-300">
          {course.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
          {course.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg sm:text-xl font-bold text-[#D2145A]">
            ${course.price}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            One-time payment
          </span>
        </div>

        <Button
          label="Enroll Now"
          className="bg-[#D2145A] text-white hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] w-full h-10 sm:h-12 rounded-lg transition-all duration-300 text-sm sm:text-base font-medium"
        />
      </div>
    </div>
  </div>
);

export default FeaturedCourses;
