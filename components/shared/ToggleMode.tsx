"use client";

import React, { useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import { useTheme } from "@/contexts/ThemeContext";

const ToggleMode: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle theme toggle with animation
  const handleToggle = () => {
    setIsAnimating(true);
    toggleDarkMode();

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative overflow-hidden group
        w-10 h-10 rounded-xl font-extrabold
        transition-all duration-500 ease-in-out
        hover:scale-110 active:scale-95
        ${
          darkMode
            ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-yellow-300 border-2 border-purple-400/50"
            : "bg-gradient-to-br from-yellow-400 via-orange-300 to-pink-300 text-orange-800 border-2 border-orange-200/50"
        }
        ${isAnimating ? "animate-pulse" : ""}
      `}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background glow effect */}
      <div
        className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300
        ${
          darkMode
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : "bg-gradient-to-r from-yellow-400 to-orange-400"
        }
      `}
      ></div>

      {/* Icon container with enhanced animations */}
      <div
        className={`
        relative z-10 flex items-center justify-center h-full
        transform transition-all duration-500
        ${isAnimating ? "rotate-180 scale-75" : "rotate-0 scale-100"}
      `}
      >
        {darkMode ? (
          <div className="relative">
            <BsMoonStarsFill
              size={18}
              className="drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
            />
            {/* Twinkling stars effect */}
            <div className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            <div className="absolute -bottom-0.5 -left-0.5 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-200"></div>
          </div>
        ) : (
          <div className="relative">
            <IoSunny
              size={20}
              className="drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300 group-hover:rotate-45"
            />
            {/* Sun rays effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 animate-ping"></div>
            </div>
          </div>
        )}
      </div>

      {/* Floating particles effect */}
      <div
        className={`
        absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300
      `}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-0.5 h-0.5 rounded-full
              ${darkMode ? "bg-purple-300" : "bg-yellow-400"}
              animate-bounce
            `}
            style={{
              left: `${20 + i * 20}%`,
              top: `${15 + i * 15}%`,
              animationDelay: `${i * 200}ms`,
              animationDuration: "1s",
            }}
          ></div>
        ))}
      </div>

      {/* Ripple effect on click */}
      <div
        className={`
        absolute inset-0 rounded-xl opacity-0 pointer-events-none
        ${isAnimating ? "animate-ping opacity-30" : ""}
        ${
          darkMode
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : "bg-gradient-to-r from-yellow-400 to-orange-400"
        }
      `}
      ></div>
    </button>
  );
};

export default ToggleMode;
