"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SkeletonTheme } from "react-loading-skeleton";
import { Service } from "@/utils/interfaces";
import ServiceCard from "../shared/ServiceCard";

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const [loading, setLoading] = useState(true);
  const shouldAutoScroll = services.length > 3; // Enable autoplay if more than 3 services

  // Simulate loading state (optional, since services may be static or fetched)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Professional Services
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Professional Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Looking to build a custom dApp, smart contract, or Web3 solution?
            Our team offers comprehensive development services.
          </p>
        </div>

        {/* Custom Pagination Styles */}
        <style jsx global>{`
          .services-desktop-pagination .swiper-pagination-bullet,
          .services-mobile-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #d1d5db;
            opacity: 1;
            margin: 0 4px;
            transition: all 0.3s ease;
          }

          .services-desktop-pagination .swiper-pagination-bullet-active,
          .services-mobile-pagination .swiper-pagination-bullet-active {
            background: #d2145a;
            width: 32px;
            border-radius: 6px;
          }

          .dark .services-desktop-pagination .swiper-pagination-bullet,
          .dark .services-mobile-pagination .swiper-pagination-bullet {
            background: #4b5563;
          }

          .dark .services-desktop-pagination .swiper-pagination-bullet-active,
          .dark .services-mobile-pagination .swiper-pagination-bullet-active {
            background: #d2145a;
          }

          .services-desktop-prev:hover svg,
          .services-desktop-next:hover svg {
            color: white !important;
          }
        `}</style>

        {/* Services Container */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
              {Array.from({ length: Math.min(services.length, 4) }).map(
                (_, i) => (
                  <SkeletonTheme
                    key={i}
                    baseColor="#202020"
                    highlightColor="#444"
                    borderRadius={8}
                  >
                    <div className="w-full max-w-[300px] h-[300px] rounded-3xl bg-gray-800" />
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
                      el: ".services-desktop-pagination",
                    }}
                    navigation={{
                      enabled: shouldAutoScroll,
                      nextEl: ".services-desktop-next",
                      prevEl: ".services-desktop-prev",
                    }}
                    loop={shouldAutoScroll}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mb-8"
                    spaceBetween={20}
                    breakpoints={{
                      768: {
                        slidesPerView:
                          services.length >= 2 ? 2 : services.length,
                        spaceBetween: 24,
                      },
                      1024: {
                        slidesPerView: Math.min(4, services.length),
                        spaceBetween: 28,
                      },
                      1280: {
                        slidesPerView: Math.min(4, services.length),
                        spaceBetween: 32,
                      },
                    }}
                  >
                    {services.map((service, index) => (
                      <SwiperSlide key={index} className="!flex justify-center">
                        <ServiceCard service={service} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Desktop Navigation and Pagination */}
                  <div className="flex items-center justify-between mx-[32px]">
                    {/* Navigation Arrows */}
                    {shouldAutoScroll && (
                      <div className="flex items-center gap-4">
                        <button className="services-desktop-prev w-12 h-12 rounded-full bg-transparent dark:from-[#D2145A] to-[#FF4081] border-2 border-[#D2145A] flex items-center justify-center hover:bg-[#D2145A] hover:text-white transition-all duration-300 shadow-lg">
                          <FiChevronLeft className="w-5 h-5 text-[#D2145A] hover:text-white" />
                        </button>
                        <button className="services-desktop-next w-12 h-12 rounded-full bg-transparent dark:from-[#D2145A] to-[#FF4081] border-2 border-[#D2145A] flex items-center justify-center hover:bg-[#D2145A] hover:text-white transition-all duration-300 shadow-lg">
                          <FiChevronRight className="w-5 h-5 text-[#D2145A] hover:text-white" />
                        </button>
                      </div>
                    )}

                    {/* Pagination */}
                    <div className="services-desktop-pagination flex items-center justify-end gap-2 ml-auto">
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
                      el: ".services-mobile-pagination",
                    }}
                    navigation={false}
                    loop={true}
                    modules={[Autoplay, Pagination]}
                    className="mb-8"
                    spaceBetween={16}
                    slidesPerView={1}
                  >
                    {services.map((service, index) => (
                      <SwiperSlide key={index} className="!flex justify-center">
                        <ServiceCard service={service} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Mobile Pagination */}
                  <div className="services-mobile-pagination flex items-center justify-center gap-2">
                    {/* Pagination bullets will be rendered here by Swiper */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden inline-block"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Services
              <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
