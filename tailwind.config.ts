import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Airbnb 品牌色
        rausch: "#ff385c",
        "deep-rausch": "#e00b41",
        "plus-magenta": "#92174d",
        "luxe-purple": "#460479",
        
        // 背景与表面
        canvas: "#ffffff",
        "soft-cloud": "#f7f7f7",
        "hairline-gray": "#dddddd",
        
        // 文字色
        ink: "#222222",
        charcoal: "#3f3f3f",
        "ash-gray": "#6a6a6a",
        "mute-gray": "#929292",
        "stone-gray": "#c1c1c1",
        
        // 语义色
        error: "#c13515",
        "deep-error": "#b32505",
        info: "#428bff",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      fontSize: {
        // 基于 Airbnb Cereal VF 的尺寸系统
        "section-heading": ["28px", { lineHeight: "1.43", fontWeight: "700" }],
        "subsection-heading": ["22px", { lineHeight: "1.18", fontWeight: "500", letterSpacing: "-0.44px" }],
        "card-title": ["21px", { lineHeight: "1.43", fontWeight: "700" }],
        "listing-title": ["20px", { lineHeight: "1.20", fontWeight: "600", letterSpacing: "-0.18px" }],
        "subtitle-bold": ["16px", { lineHeight: "1.25", fontWeight: "600" }],
        "body-medium": ["16px", { lineHeight: "1.25", fontWeight: "500" }],
        "button-large": ["16px", { lineHeight: "1.25", fontWeight: "500" }],
        "button-default": ["14px", { lineHeight: "1.29", fontWeight: "500" }],
        "link": ["14px", { lineHeight: "1.43", fontWeight: "500" }],
        "caption-medium": ["14px", { lineHeight: "1.29", fontWeight: "500" }],
        "caption-bold": ["14px", { lineHeight: "1.43", fontWeight: "600" }],
        "caption-small": ["13px", { lineHeight: "1.23", fontWeight: "400" }],
        "micro-default": ["12px", { lineHeight: "1.33", fontWeight: "400" }],
        "micro-bold": ["12px", { lineHeight: "1.33", fontWeight: "700" }],
        "badge": ["11px", { lineHeight: "1.18", fontWeight: "600" }],
        "superscript": ["8px", { lineHeight: "1.25", fontWeight: "700", letterSpacing: "0.32px" }],
      },
      borderRadius: {
        "sm": "4px",
        "md": "8px",
        "lg": "14px",
        "xl": "20px",
        "pill": "32px",
        "full": "50%",
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
      },
      boxShadow: {
        "elevation-1": "rgba(0, 0, 0, 0.08) 0 4px 12px",
        "elevation-2": "rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0",
        "focus-ring": "0 0 0 2px #222222",
        "white-separator": "rgb(255, 255, 255) 0 0 0 4px",
      },
      maxWidth: {
        "content": "1760px",
        "detail": "1280px",
      },
    },
  },
  plugins: [],
};
export default config;