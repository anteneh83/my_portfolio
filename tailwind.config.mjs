/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0F172A",
        primary: "#8B5CF6",
        accent: "#22D3EE",
        highlight: "#EC4899",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { boxShadow: "0 0 20px #8B5CF6, 0 0 40px #8B5CF6" },
          to: { boxShadow: "0 0 40px #22D3EE, 0 0 80px #22D3EE" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
