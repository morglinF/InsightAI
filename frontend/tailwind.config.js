/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        background: "#0B1020",
        surface: "#172033",
        sidebar: "#111827",

        primary: "#7C3AED",
        secondary: "#06B6D4",

        border: "rgba(255,255,255,0.08)",

        textPrimary: "#F8FAFC",
        textSecondary: "#94A3B8",
      },

      boxShadow: {
        glow: "0 0 20px rgba(124,58,237,0.35)",
      },

      borderRadius: {
        xl2: "20px",
      }

    },
  },
  plugins: [],
}