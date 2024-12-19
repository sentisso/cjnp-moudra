/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          950: "#1e1f22", // Darkest (Server list bg)
          900: "#2b2d31", // Darker (Channel list bg)
          800: "#313338", // Dark (Main chat bg)
          700: "#383a40", // Slightly lighter
          600: "#4e5058", // Border dark
          500: "#40444b", // Input background
          400: "#72767d", // Muted text
          300: "#96989d", // Secondary text
          200: "#dcddde", // Primary text
          100: "#e3e5e8", // Bright text
          50: "#ffffff", // White text
        },
      },
    },
  },
  plugins: [],
};
