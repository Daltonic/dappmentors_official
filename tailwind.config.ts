import type { Config } from "tailwindcss/types";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        dark: "#FFFFFF", // Pure black
        medium: "#000000", // Pure white
        lightPink: "#FFBAD4",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(0deg, #000000, #000000), linear-gradient(270deg, rgba(33, 20, 100, 0) 0%, rgba(6, 1, 29, 0.61) 49%, rgba(6, 1, 29, 0.92) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
