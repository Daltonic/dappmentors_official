"use client";
import { globalActions } from "@/store/globalSlices";
import { RootState } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const ToggleMode: React.FC = () => {
  const { darkMode } = useSelector((states: RootState) => states.globalStates);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setDarkMode } = globalActions;
  const dispatch = useDispatch();

  // Initialize from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const initialDarkMode = savedTheme === "dark";
      setIsDarkMode(initialDarkMode);
      dispatch(setDarkMode(initialDarkMode));

      if (initialDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [dispatch, setDarkMode]);

  // Handle changes to dark mode
  const toggleDarkMode = () => {
    setIsAnimating(true);
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    dispatch(setDarkMode(newDarkMode));

    if (typeof window !== "undefined") {
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Sync local state with Redux state
  useEffect(() => {
    setIsDarkMode(darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative overflow-hidden group
        w-14 h-14 rounded-2xl font-extrabold
        transition-all duration-500 ease-in-out
        hover:scale-110 active:scale-95
        ${
          isDarkMode
            ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-yellow-300 border-2 border-purple-400/50"
            : "bg-gradient-to-br from-yellow-400 via-orange-300 to-pink-300 text-orange-800 border-2 border-orange-200/50"
        }
        ${isAnimating ? "animate-pulse" : ""}
      `}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background glow effect */}
      <div
        className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300
        ${
          isDarkMode
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
        {isDarkMode ? (
          <div className="relative">
            <BsMoonStarsFill
              size={24}
              className="drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
            />
            {/* Twinkling stars effect */}
            <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-200"></div>
          </div>
        ) : (
          <div className="relative">
            <IoSunny
              size={28}
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
              absolute w-1 h-1 rounded-full
              ${isDarkMode ? "bg-purple-300" : "bg-yellow-400"}
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
        absolute inset-0 rounded-2xl opacity-0 pointer-events-none
        ${isAnimating ? "animate-ping opacity-30" : ""}
        ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : "bg-gradient-to-r from-yellow-400 to-orange-400"
        }
      `}
      ></div>
    </button>
  );
};

export default ToggleMode;
