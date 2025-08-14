// Call to Action Section
import { CTASectionProps } from "@/utils/interfaces";
import React from "react";

const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Start Your Web3 Journey?",
  highlightText = "Web3 Journey",
  subtitle = "Join thousands of developers who have transformed their careers with Dapp Mentors. Let's build the decentralized applications of tomorrow, together.",
  primaryButtonText = "Start Learning Today",
  secondaryButtonText = "Join Community",
  gradientFrom = "gray-900",
  gradientTo = "purple-900",
  darkGradientFrom = "black",
  darkGradientTo = "purple-900",
  primaryButtonClassName = "group bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl",
  secondaryButtonClassName = "group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-white hover:text-gray-900",
}) => {
  // Dynamically construct the background gradient class
  const backgroundGradient = `bg-gradient-to-br from-${gradientFrom} to-${gradientTo} dark:from-${darkGradientFrom} dark:to-${darkGradientTo}`;

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
    <section className={`py-20 ${backgroundGradient} relative overflow-hidden`}>
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
        <h2 className="text-4xl md:text-6xl font-cambo font-normal text-white mb-8">
          {renderHighlightedTitle()}
        </h2>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className={primaryButtonClassName}>
            <span className="flex items-center gap-3">
              {primaryButtonText}
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

          <button className={secondaryButtonClassName}>
            <span className="flex items-center gap-3">
              {secondaryButtonText}
              <svg
                className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
