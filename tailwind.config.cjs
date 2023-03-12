/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pearl: "#fbfcf8"
      }
    },
  },
  plugins: [],
};

module.exports = config;
