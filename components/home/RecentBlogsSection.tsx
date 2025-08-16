"use client";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SkeletonTheme } from "react-loading-skeleton";
import { postx as posts } from "@/data/global";
import PostCard from "../shared/PostCard";

const RecentBlogsSection = () => {
  const [loading, setLoading] = useState(true);
  const shouldAutoScroll = posts.length > 3;

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
              Recent Blog Posts
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Latest Web3 Tutorials & Guides
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Practical, hands-on content designed to guide you through every step
            of your Web3 development journey.
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
              {Array.from({ length: Math.min(posts.length, 3) }).map((_, i) => (
                <SkeletonTheme
                  key={i}
                  baseColor="#202020"
                  highlightColor="#444"
                  borderRadius={8}
                >
                  <div className="w-full max-w-[380px] h-[600px] rounded-3xl bg-gray-800" />
                </SkeletonTheme>
              ))}
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
                        slidesPerView: posts.length >= 2 ? 2 : posts.length,
                        spaceBetween: 24,
                      },
                      1024: {
                        slidesPerView: Math.min(3, posts.length),
                        spaceBetween: 28,
                      },
                      1280: {
                        slidesPerView: Math.min(3, posts.length),
                        spaceBetween: 32,
                      },
                    }}
                  >
                    {posts.map((post, index) => (
                      <SwiperSlide key={index} className="!flex justify-center">
                        <PostCard post={post} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Desktop Navigation and Pagination */}
                  <div className="flex items-center justify-between mx-[32px]">
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
                    <div className="desktop-pagination flex items-center justify-end gap-2 ml-auto">
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
                    {posts.map((post, index) => (
                      <SwiperSlide key={index} className="!flex justify-center">
                        <PostCard post={post} />
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
              View All Posts
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

export default RecentBlogsSection;
