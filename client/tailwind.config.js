/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f0fbfb",
          100: "#dff7f6",
          300: "#7ad7d3",
          500: "#06b6b6",
          700: "#047a7a"
        }
      }
    }
  },
  plugins: []
};