"use client";

import { HeroSectionProps, Particle } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Extend the HeroSectionProps to include children and layout options
interface ExtendedHeroSectionProps extends HeroSectionProps {
  children?: React.ReactNode;
  layout?: "centered" | "grid";
  rightContent?: React.ReactNode;
}

const HeroSection: React.FC<ExtendedHeroSectionProps> = ({
  tagText = "Premium Products",
  title = "Master Web3 Development",
  highlightText = "Web3 Development",
  subtitle = "Expertly crafted courses, bootcamps, codebases, and eBooks designed to transform you into a confident blockchain developer.",
  gradientFrom = "#D2145A",
  gradientTo = "#FF4081",
  backgroundGradient = "from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20",
  children,
  layout = "centered",
  rightContent,
}) => {
  const particleCount = 20;

  // Possible colors without alpha for opacity animation
  const colorPalette = [gradientFrom, gradientTo, "#a855f7"];

  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles once on mount
  useEffect(() => {
    const generatedParticles = Array.from({ length: particleCount }).map(() => {
      const duration = 10 + Math.random() * 10; // 10-20 seconds
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        baseSize: Math.random() * 8 + 4,
        duration,
        xAmp: (Math.random() - 0.5) * 40, // slight movement: +/- 20px
        yAmp: (Math.random() - 0.5) * 40, // slight movement: +/- 20px
        scaleMax: 1 + Math.random() * 0.5, // 1 to 1.5
        scaleMin: 0.7 + Math.random() * 0.3, // 0.7 to 1
        opacityBase: 0.2 + Math.random() * 0.2, // 0.2-0.4 base opacity
        opacityDelta: Math.random() * 0.1, // 0-0.1 delta for variation
        delay: Math.random() * 5, // initial delay 0-5s for staggering
      };
    });
    setParticles(generatedParticles);
  }, []);

  // Function to split title and highlight the specified text
  const renderHighlightedTitle = () => {
    if (!highlightText || !title.includes(highlightText)) {
      return <span>{title}</span>; // Return title as is if no highlightText or not found
    }
    const parts = title.split(new RegExp(`(${highlightText})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlightText.toLowerCase() ? (
            <span
              key={index}
              className={`text-transparent bg-clip-text bg-gradient-to-r from-[${gradientFrom}] to-[${gradientTo}] animate-pulse`}
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

  // Content component for reuse
  const HeroContent = () => (
    <div className={layout === "centered" ? "text-center" : ""}>
      {/* Tag */}
      <div
        className={`inline-flex items-center gap-3 bg-gradient-to-r from-[${gradientFrom}]/10 to-[${gradientTo}]/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-pulse`}
      >
        <span
          className={`text-[${gradientFrom}] font-semibold text-sm uppercase tracking-wider`}
        >
          {tagText}
        </span>
        <div
          className={`w-2 h-2 bg-[${gradientFrom}] rounded-full animate-pulse`}
        />
      </div>

      {/* Title */}
      <h1
        className={`font-cambo text-5xl md:text-7xl ${layout === "centered" ? "lg:text-8xl" : "lg:text-6xl"} font-normal tracking-tight text-gray-900 dark:text-white mb-8 ${layout === "grid" ? "leading-tight" : ""}`}
      >
        {renderHighlightedTitle()}
      </h1>

      {/* Subtitle */}
      <p
        className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 ${layout === "centered" ? "max-w-5xl mx-auto" : ""}`}
      >
        {subtitle}
      </p>

      {/* Children Slot */}
      {children}
    </div>
  );

  return (
    <section
      className={`relative w-full bg-gradient-to-br ${backgroundGradient} py-20 lg:py-32 overflow-hidden`}
    >
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

      {/* Floating Particles */}
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {layout === "grid" ? (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <HeroContent />
            {rightContent && <div className="relative">{rightContent}</div>}
          </div>
        ) : (
          <HeroContent />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
