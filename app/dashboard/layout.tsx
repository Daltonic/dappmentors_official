"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/dashboard/Header";

type Particle = {
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
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userName = "John Doe";

  const particleCount = 20;

  // Possible colors without alpha for opacity animation
  const colorPalette = ["#D2145A", "#FF4081", "#a855f7"];

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
        opacityBase: 0.3 + Math.random() * 0.3, // 0.3-0.6 base opacity
        opacityDelta: Math.random() * 0.1, // 0-0.1 delta for variation
        delay: Math.random() * 5, // initial delay 0-5s for staggering
      };
    });
    setParticles(generatedParticles);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100
      dark:from-gray-900 dark:via-black dark:to-gray-900 relative
      text-black dark:text-white overflow-hidden"
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

      {/* Header */}
      <Header userName={userName} />

      <div className="h-20"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
