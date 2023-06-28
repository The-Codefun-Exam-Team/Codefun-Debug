/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: ["tailwindcss,autoprefixer", require("@tailwindcss/typography")],
  theme: {
    extend: {
      transitionTimingFunction: {
        "in-back": "cubic-bezier(0.36, 0.00, 0.66, -0.56)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1.00)",
        "in-out-back": "cubic-bezier(0.68, -0.60, 0.32, 1.60)",
        "in-circ": "cubic-bezier(0.55, 0.00, 1.00, 0.45)",
        "out-circ": "cubic-bezier(0.00, 0.55, 0.45, 1.00)",
        "in-out-circ": "cubic-bezier(0.85, 0.00, 0.15, 1.00)",
      },
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
