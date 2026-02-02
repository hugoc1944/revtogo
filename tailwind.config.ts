import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5A8",
        secondary: "#2DD4BF",

        bg: "#F8FAFC",
        surface: "#F1F5F9",
        soft: "#CCFBF1",

        ink: "#0F172A",
        muted: "#475569",
      },

      fontSize: {
        // Desktop
        "h1-desktop": ["48px", { lineHeight: "56px" }],
        "h2-desktop": ["36px", { lineHeight: "28px" }],
        "h3-desktop": ["31px", { lineHeight: "28px" }],
        "body-desktop": ["16px", { lineHeight: "28px" }],
        "nav-desktop": ["20px", { lineHeight: "28px" }],

        // Mobile
        "h1-mobile": ["25px", { lineHeight: "28px" }],
        "h2-mobile": ["21px", { lineHeight: "25px" }],
        "h3-mobile": ["16px", { lineHeight: "20px" }],
        "body-mobile": ["16px", { lineHeight: "20px" }],
        "body-small": ["13px", { lineHeight: "20px" }],
        "micro": ["11px", { lineHeight: "20px" }],
      },

      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
      },
    },
  },
  plugins: [],
};

export default config;
