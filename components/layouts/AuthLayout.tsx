"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ToggleMode from "../shared/ToggleMode";

interface Particle {
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
}

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const colorPalette = ["#D2145A", "#FF4081", "#a855f7"];
  const particleCount = 15;

  // Generate particles on mount
  useEffect(() => {
    const generatedParticles = Array.from({ length: particleCount }).map(() => {
      const duration = 12 + Math.random() * 8; // 12-20 seconds
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        baseSize: Math.random() * 6 + 3,
        duration,
        xAmp: (Math.random() - 0.5) * 30,
        yAmp: (Math.random() - 0.5) * 30,
        scaleMax: 1 + Math.random() * 0.4,
        scaleMin: 0.8 + Math.random() * 0.2,
        opacityBase: 0.15 + Math.random() * 0.15,
        opacityDelta: Math.random() * 0.08,
        delay: Math.random() * 4,
      };
    });
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 relative overflow-hidden flex items-center justify-center p-4">
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

      {/* Login Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-center items-center mb-4">
          <ToggleMode />
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
