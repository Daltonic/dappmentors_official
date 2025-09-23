"use client";

import { CTASectionProps } from "@/utils/interfaces";
import React from "react";
import { FaArrowRight, FaUsers } from "react-icons/fa";

interface ExtendedCTASectionProps extends CTASectionProps {
  primaryOnClick?: () => void;
  secondaryOnClick?: () => void;
  secondaryIcon?: React.ReactNode;
}

const CTASection: React.FC<ExtendedCTASectionProps> = ({
  title = "Ready to Start Your Web3 Journey?",
  highlightText = "Web3 Journey",
  subtitle = "Join thousands of developers who have transformed their careers with Dapp Mentors. Let’s build the decentralized applications of tomorrow, together.",
  primaryButtonText = "Start Learning Today",
  secondaryButtonText = "",
  primaryButtonClassName = "group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl",
  secondaryButtonClassName = "group bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 border-[#FF4081]/50 dark:border-white/30 text-[#D2145A] dark:text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D2145A] hover:to-[#FF4081] hover:text-white dark:hover:bg-white dark:hover:text-[#D2145A]",
  primaryOnClick,
  secondaryOnClick,
  secondaryIcon,
}) => {
  // Function to split title and highlight the specified text
  const renderHighlightedTitle = () => {
    if (!highlightText || !title.includes(highlightText)) {
      return <span>{title}</span>;
    }
    const parts = title.split(new RegExp(`(${highlightText})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlightText.toLowerCase() ? (
            <span
              key={index}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081]"
            >
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </span>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-black dark:to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-cambo font-normal text-gray-900 dark:text-white mb-8">
          {renderHighlightedTitle()}
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className={primaryButtonClassName} onClick={primaryOnClick}>
            <span className="flex items-center gap-3">
              {primaryButtonText}
              <FaArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          {secondaryButtonText && (
            <button
              className={secondaryButtonClassName}
              onClick={secondaryOnClick}
            >
              <span className="flex items-center gap-3">
                {secondaryButtonText}

                {secondaryIcon ? (
                  secondaryIcon
                ) : (
                  <FaUsers className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                )}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
