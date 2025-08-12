"use client";

import { useState, useEffect } from "react";

const usePagination = () => {
  const [paginationButtons, setPaginationButtons] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPaginationButtons(3); // Show 3 buttons on mobile
      } else {
        setPaginationButtons(5); // Show 5 buttons on larger screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return paginationButtons;
};

export default usePagination;
