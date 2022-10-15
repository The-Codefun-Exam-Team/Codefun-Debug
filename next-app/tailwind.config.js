/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: ["tailwindcss ,autoprefixer"],
  theme: {
    extend: {},
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
}
