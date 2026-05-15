/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Augur palette — deep navy + signal cyan from the logo
        ink: {
          950: "#070b14",
          900: "#0a1020",
          800: "#0f1729",
          700: "#16203a",
          600: "#1f2c4a",
          500: "#2a3a5e",
        },
        signal: {
          50: "#e6fbff",
          100: "#c0f4ff",
          200: "#7fe7ff",
          300: "#3ed4f0",
          400: "#19b8d4",
          500: "#0a96b0",
          600: "#0a7689",
          700: "#0d5e6d",
        },
        bone: {
          50: "#f7f5ef",
          100: "#ebe6d8",
          200: "#d9d1bd",
          300: "#bdb195",
        },
        success: "#3ed4f0",
        warn: "#e8b04b",
        danger: "#e8666b",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Geist"', '"Inter"', "ui-sans-serif", "system-ui"],
        mono: ['"JetBrains Mono"', '"Geist Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(62,212,240,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(62,212,240,0.04) 1px, transparent 1px)",
        "radial-signal":
          "radial-gradient(ellipse at top, rgba(62,212,240,0.15), transparent 60%)",
      },
      animation: {
        "ticker": "ticker 40s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
