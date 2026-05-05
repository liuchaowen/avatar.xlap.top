import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Airbnb 品牌色 - 使用 CSS 变量支持主题切换
        rausch: "var(--rausch)",
        "deep-rausch": "var(--deep-rausch)",
        "plus-magenta": "var(--plus-magenta)",
        "luxe-purple": "var(--luxe-purple)",
        
        // 背景与表面
        canvas: "var(--canvas)",
        "soft-cloud": "var(--soft-cloud)",
        "hairline-gray": "var(--hairline-gray)",
        
        // 文字色
        ink: "var(--ink)",
        charcoal: "var(--charcoal)",
        "ash-gray": "var(--ash-gray)",
        "mute-gray": "var(--mute-gray)",
        "stone-gray": "var(--stone-gray)",
        
        // 语义色
        error: "var(--error)",
        "deep-error": "var(--deep-error)",
        info: "var(--info)",
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