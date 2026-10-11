/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Royal Editorial palette (DESIGN.md)
      colors: {
        ebony: "#1A1817",
        ink: "#3B3634",
        ivory: "#FAF8F5",
        cream: "#F5F0EB",
        sand: "#EDE7DF",
        gold: { DEFAULT: "#C5A059", light: "#DFBA73", deep: "#8C6D33" },
        terracotta: "#A85D42",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.02em" }],
        "display-lg-m": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em" }],
        "display-md": ["48px", { lineHeight: "56px", letterSpacing: "-0.015em" }],
        "display-md-m": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em" }],
        "headline-lg": ["36px", { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "500" }],
        "headline-lg-m": ["28px", { lineHeight: "36px", fontWeight: "500" }],
        "headline-md": ["26px", { lineHeight: "34px", fontWeight: "500" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "30px", letterSpacing: "0.01em" }],
        "body-md": ["15px", { lineHeight: "24px", letterSpacing: "0.01em" }],
        "body-sm": ["13px", { lineHeight: "20px", letterSpacing: "0.01em" }],
        "label-lg": ["12px", { lineHeight: "16px", letterSpacing: "0.15em", fontWeight: "600" }],
        "label-md": ["11px", { lineHeight: "14px", letterSpacing: "0.12em", fontWeight: "600" }],
        "label-sm": ["10px", { lineHeight: "12px", letterSpacing: "0.18em", fontWeight: "700" }],
      },
      spacing: {
        margin: "1.25rem",
        "margin-desktop": "4rem",
        "space-xs": "0.375rem",
        "space-sm": "0.75rem",
        "space-md": "1.25rem",
        "space-lg": "2.25rem",
        "space-xl": "4rem",
      },
      borderRadius: { DEFAULT: "0.25rem" },
      boxShadow: {
        float: "0px 18px 42px -10px rgba(26,24,23,0.08), 0px 4px 16px -2px rgba(197,160,89,0.12)",
        "float-lg": "0px 28px 60px -12px rgba(26,24,23,0.18), 0px 6px 20px -2px rgba(197,160,89,0.22)",
      },
    },
  },
  plugins: [],
};
