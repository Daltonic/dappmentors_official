"use client";

import DevelopmentMode from "../shared/DevelopmentMode";
import Footer from "../shared/Footer";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen text-black dark:text-white transition-all duration-300">
      <DevelopmentMode />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
