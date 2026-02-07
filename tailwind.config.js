/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // или 'media' для автоматического определения
  theme: {
    extend: {},
  },
  plugins: [],
}