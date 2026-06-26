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
        "black-deep": "#0d0d0d",
        "brown-dark": "#1a0f08",
        "brown-mid": "#2a1a0e",
        gold: "#b8860b",
        "gold-light": "#d4a843",
        cream: "#f5e6c8",
        "cream-muted": "#c9b48a",
      },
      fontFamily: {
        arabic: ["Noto Naskh Arabic", "serif"],
        english: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #b8860b 0%, #d4a843 50%, #b8860b 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
