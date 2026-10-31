/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070b14",
          900: "#0b1220",
          800: "#121b30",
          700: "#1b2742",
          600: "#263557",
          500: "#33436b",
        },
        gold: {
          50: "#fbf6e9",
          100: "#f5e9c8",
          200: "#ecd79b",
          300: "#e0c069",
          400: "#d4a93f",
          500: "#c1912a",
          600: "#9c7220",
          700: "#74561d",
          800: "#4f3b17",
          900: "#2c2010",
        },
        cream: {
          50: "#fefcf7",
          100: "#faf4e8",
          200: "#f3e8d2",
        },
        sage: {
          400: "#7fa38a",
          500: "#5d8870",
          600: "#476b56",
        },
        clay: {
          400: "#c98a6b",
          500: "#b06f4f",
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-pan": {
          "0%": { transform: "scale(1.05) translateY(0)" },
          "100%": { transform: "scale(1.12) translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.8s ease both",
        "slow-pan": "slow-pan 18s ease-in-out infinite alternate",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};
