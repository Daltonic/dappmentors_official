"use client";

import Image from "next/image";
import { useState } from "react";

const trainingVideos = [
  {
    src: "/images/home/Content(12).png",
    alt: "Smart Contract Fundamentals",
    className: "h-48",
    title: "Smart Contract Fundamentals",
    duration: "12:45",
    views: "2.3K views",
    category: "Beginner",
  },
  {
    src: "/images/home/EmpowerSection.jpeg",
    alt: "DeFi Protocol Deep Dive",
    className: "h-48",
    title: "DeFi Protocol Deep Dive",
    duration: "18:32",
    views: "1.8K views",
    category: "Advanced",
  },
  {
    src: "/images/home/Content(13).png",
    alt: "Building Your First dApp",
    className: "h-64",
    title: "Building Your First dApp",
    duration: "25:18",
    views: "5.1K views",
    category: "Intermediate",
  },
  {
    src: "/images/home/Content(14).png",
    alt: "Web3 Security Best Practices",
    className: "h-64",
    title: "Web3 Security Best Practices",
    duration: "15:42",
    views: "3.2K views",
    category: "Advanced",
  },
  {
    src: "/images/home/Content(16).png",
    alt: "NFT Marketplace Development",
    className: "h-64",
    title: "NFT Marketplace Development",
    duration: "22:15",
    views: "4.7K views",
    category: "Intermediate",
  },
  {
    src: "/images/home/Content(17).png",
    alt: "Blockchain Integration Patterns",
    className: "h-64",
    title: "Blockchain Integration Patterns",
    duration: "19:08",
    views: "2.9K views",
    category: "Advanced",
  },
  {
    src: "/images/home/Content(12).png",
    alt: "Web3 Frontend Development",
    className: "h-48",
    title: "Web3 Frontend Development",
    duration: "16:33",
    views: "3.8K views",
    category: "Intermediate",
  },
  {
    src: "/images/home/EmpowerSection.jpeg",
    alt: "Token Economics Masterclass",
    className: "h-48",
    title: "Token Economics Masterclass",
    duration: "21:27",
    views: "2.1K views",
    category: "Advanced",
  },
];

interface VideoThumbnailProps {
  video: {
    src: string;
    alt: string;
    className: string;
    title: string;
    duration: string;
    views: string;
    category: string;
  };
  index: number;
}

const VideoThumbnail = ({ video, index }: VideoThumbnailProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Advanced":
        return "bg-red-500";
      default:
        return "bg-[#D2145A]";
    }
  };

  return (
    <div
      className={`relative ${video.className} group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail */}
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <Image
          src={video.src}
          alt={video.alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="transition-transform duration-300 group-hover:scale-110"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />

        {/* YouTube Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? "scale-110 bg-red-700" : ""}`}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>

        {/* Category Badge */}
        <div
          className={`absolute top-2 left-2 ${getCategoryColor(video.category)} text-white text-xs px-2 py-1 rounded`}
        >
          {video.category}
        </div>

        {/* Live Indicator (for some videos) */}
        {index === 2 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
        )}
      </div>

      {/* Video Info Overlay (appears on hover) */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 rounded-b-lg transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        <h3 className="text-white text-sm font-semibold line-clamp-2 mb-1">
          {video.title}
        </h3>
        <p className="text-gray-300 text-xs">Dapp Mentors • {video.views}</p>
      </div>
    </div>
  );
};

export default function Web3TrainingGallery() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 dark:animate-pulse">
            <p className="text-[#D2145A] font-inter font-semibold text-xs sm:text-sm md:text-base uppercase">
              TRAINING GALLERY
            </p>
            <div className="w-8 sm:w-12 md:w-16 border border-[#FFBAD4]"></div>
          </div>

          <h2 className="font-cambo font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6">
            Web3 Training Sessions in Action
          </h2>

          <p className="font-inter text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Explore our comprehensive Web3 training sessions, from beginner
            fundamentals to advanced protocols and security practices.
          </p>
        </div>

        {/* Video Gallery Grid */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
          {/* Left Column - Shorter videos */}
          <div className="flex flex-col gap-4 w-full sm:w-1/4 sm:mt-8 md:mt-14">
            <VideoThumbnail video={trainingVideos[0]} index={0} />
            <VideoThumbnail video={trainingVideos[1]} index={1} />
          </div>

          {/* Middle Column 1 - Taller videos */}
          <div className="flex flex-col gap-4 w-full sm:w-1/4">
            <VideoThumbnail video={trainingVideos[2]} index={2} />
            <VideoThumbnail video={trainingVideos[3]} index={3} />
          </div>

          {/* Middle Column 2 - Taller videos */}
          <div className="flex flex-col gap-4 w-full sm:w-1/4">
            <VideoThumbnail video={trainingVideos[4]} index={4} />
            <VideoThumbnail video={trainingVideos[5]} index={5} />
          </div>

          {/* Right Column - Shorter videos */}
          <div className="flex flex-col gap-4 w-full sm:w-1/4 sm:mt-8 md:mt-14">
            <VideoThumbnail video={trainingVideos[6]} index={6} />
            <VideoThumbnail video={trainingVideos[7]} index={7} />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              View All Training Videos
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
}
