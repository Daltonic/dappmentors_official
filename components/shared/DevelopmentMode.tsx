"use client";

import React, { useEffect, useState } from "react";

const DevelopmentMode = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); // Show notification only after scrolling past 100px
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full bg-[#D2145A] dark:bg-[#D2145A]/80 text-white text-center py-2 px-4 shadow-md transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-100 pointer-events-none"
        } fixed left-0 right-0 z-30`}
        style={{ top: isVisible ? "110px" : "0px" }}
      >
        <p className="text-sm md:text-base font-medium">
          🚧 Site Under Development - Stay tuned for updates! 🚧
        </p>
      </div>
      <div className="h-10"></div> {/* Spacer to prevent content overlap */}
    </>
  );
};

export default DevelopmentMode;
