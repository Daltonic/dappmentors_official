"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userName = "John Doe";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100
      dark:from-gray-900 dark:via-black dark:to-gray-900 relative
      text-black dark:text-white"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Header */}
      <Header userName={userName} />

      <div className="h-24"></div>

      {/* Content */}
      {children}
    </div>
  );
}

// Utility Components
const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<
    Array<{
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
    }>
  >([]);

  const particleCount = 8;
  const colorPalette = ["#D2145A", "#FF4081", "#a855f7", "#06b6d4"];

  useEffect(() => {
    const generatedParticles = Array.from({ length: particleCount }).map(() => {
      const duration = 15 + Math.random() * 10;
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        baseSize: Math.random() * 4 + 2,
        duration,
        xAmp: (Math.random() - 0.5) * 20,
        yAmp: (Math.random() - 0.5) * 20,
        scaleMax: 1 + Math.random() * 0.3,
        scaleMin: 0.7 + Math.random() * 0.2,
        opacityBase: 0.1 + Math.random() * 0.1,
        opacityDelta: Math.random() * 0.05,
        delay: Math.random() * 5,
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
