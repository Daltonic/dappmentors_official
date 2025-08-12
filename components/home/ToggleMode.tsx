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
  };

  // Sync local state with Redux state
  useEffect(() => {
    setIsDarkMode(darkMode);
  }, [darkMode]);

  return (
    <div>
      <button
        onClick={toggleDarkMode}
        className="flex justify-center items-center font-extrabold w-[36px] h-[36px]
        p-1 bg-white text-black border-4 border-black/85 rounded-full"
      >
        {isDarkMode ? <BsMoonStarsFill size={35} /> : <IoSunny size={35} />}
      </button>
    </div>
  );
};

export default ToggleMode;
