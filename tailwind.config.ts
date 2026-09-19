import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        navy: {
          800: "#1E293B",
          900: "#0F172A",
          950: "#0B1220",
        },
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "1.025rem",
      },
    },
  },
  plugins: [],
};

export default config;
