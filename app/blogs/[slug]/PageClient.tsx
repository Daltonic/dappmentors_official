"use client";

import MarkdownRenderer from "@/components/blogs/details/MardownRenderer";
import ProgressBar from "@/components/blogs/details/ProgressBar";
import SocialShare from "@/components/blogs/details/SocialShare";
import TableOfContents from "@/components/blogs/details/TableOfContent";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import HeroSection from "@/components/shared/HeroSection";
import { BlogPost } from "@/utils/interfaces";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Avatar from "@/components/shared/Avatar";
import { getHighlightWord } from "@/heplers/global";

interface PageClientProps {
  blogPost: BlogPost;
}

const PageClient: React.FC<PageClientProps> = ({ blogPost }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showMobileToc, setShowMobileToc] = useState<boolean>(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // Format publish date for display
  const formattedDate = new Date(blogPost.publishDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `bookmark-${blogPost.id}`,
        (!isBookmarked).toString(),
      );
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    console.log(`Navigate to: ${href}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookmarkState = localStorage.getItem(`bookmark-${blogPost.id}`);
      if (bookmarkState) {
        setIsBookmarked(bookmarkState === "true");
      }
    }
  }, [blogPost.id]);

  return (
    <MarketingLayout>
      <ProgressBar />

      {/* Hero Section */}
      <HeroSection
        tagText={blogPost.category}
        title={blogPost.title}
        highlightText={getHighlightWord(blogPost.title)}
        subtitle={
          blogPost.excerpt.length > 50
            ? blogPost.excerpt.substring(0, 48) + "..."
            : blogPost.excerpt
        }
        backgroundGradient="from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20"
        layout="grid"
        rightContent={
          <div className="relative">
            {blogPost.image && (
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                width={600}
                height={400}
                className="rounded-2xl object-cover shadow-lg"
                priority={blogPost.featured}
              />
            )}
          </div>
        }
      >
        <div className="space-y-6">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="hover:text-[#D2145A] transition-colors duration-200"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blogs"
              onClick={(e) => handleNavClick(e, "/blogs")}
              className="hover:text-[#D2145A] transition-colors duration-200"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">
              {blogPost.category}
            </span>
          </nav>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500" aria-hidden="true">
                📅
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500" aria-hidden="true">
                ⏱️
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {blogPost.readTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500" aria-hidden="true">
                👀
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {blogPost.views} views
              </span>
            </div>
          </div>

          {/* Author & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar
                src={blogPost.author.avatar || "/images/default-avatar.jpg"}
                alt={blogPost.author.name}
                className="flex-shrink-0"
              />
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {blogPost.author.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {blogPost.author.bio || "Web3 Enthusiast"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <SocialShare title={blogPost.title} url={currentUrl} />
              <button
                onClick={handleBookmark}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isBookmarked
                    ? "bg-[#D2145A] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#D2145A] hover:text-white"
                }`}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked ? "♥" : "♡"}
              </button>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {blogPost.topics.map((topic, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-[#D2145A] hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </HeroSection>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents - Desktop */}
            <div className="lg:col-span-1 hidden lg:block">
              <TableOfContents content={blogPost.content} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-sm sm:prose-lg max-w-none">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="blog-content space-y-4 sm:space-y-6">
                    <MarkdownRenderer content={blogPost.content} />
                  </div>
                </div>
              </article>

              {/* Article Footer - Responsive */}
              <div className="mt-8 sm:mt-12 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#D2145A]/20">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Found this tutorial helpful?
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 px-2">
                    Join our community to get more Web3 development insights and
                    connect with fellow developers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                    <Link
                      href="/discord"
                      className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                    >
                      Join Discord Community
                    </Link>
                    <Link
                      href="/newsletter"
                      className="border-2 border-[#D2145A] text-[#D2145A] hover:bg-[#D2145A] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 w-full sm:w-auto"
                    >
                      Subscribe to Newsletter
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile TOC Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          className="bg-[#D2145A] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
          onClick={() => setShowMobileToc(!showMobileToc)}
          aria-label="Toggle table of contents"
        >
          📋
        </button>
      </div>

      {/* Mobile TOC Overlay */}
      {showMobileToc && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setShowMobileToc(false)}
        >
          <div
            className="absolute right-4 top-20 bottom-20 w-80 max-w-[calc(100vw-2rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full bg-white dark:bg-gray-900 rounded-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Table of Contents
                </h3>
                <button
                  onClick={() => setShowMobileToc(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                  aria-label="Close table of contents"
                >
                  ×
                </button>
              </div>
              <TableOfContents content={blogPost.content} />
            </div>
          </div>
        </div>
      )}
    </MarketingLayout>
  );
};

export default PageClient;
