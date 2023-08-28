import tailwindTypography from "@tailwindcss/typography";
import autoprefixer from "autoprefixer";

/** @type {import("tailwindcss").Config} */
const tailwindConfig = {
  darkMode: "class",
  plugins: [tailwindTypography, autoprefixer],
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
      colors: {
        user: {
          newbie: {
            light: "#000000",
            dark: "#ffffff",
          },
          beginner: {
            light: "#008000",
            dark: "#4ADE80",
          },
          novice: {
            light: "#2E8B41",
            dark: "#16A34A",
          },
          coder: {
            light: "#0000FF",
            dark: "#3B82F6",
          },
          expert: {
            light: "#9400d3",
            dark: "#A78BFA",
          },
          master: {
            light: "#daa520",
            dark: "#FACC15",
          },
          hacker: {
            light: "#FF0000",
            dark: "#FF7272",
          },
          banned: "#a9a9a9",
          problemsetter: "#ffa500",
          admin: {
            light: "#800000",
            dark: "#C17985",
          },
        },
      },
      keyframes: {
        "rainbow-light": {
          "0%": {
            color: "#c20202",
          },
          "17%": {
            color: "#daa520",
          },
          "33%": {
            color: "#08c008b9",
          },
          "50%": {
            color: "#02a0a0b4",
          },
          "67%": {
            color: "#0c0cedbc",
          },
          "84%": {
            color: "#ab0defab",
          },
          to: {
            color: "#c20202",
          },
        },
        // TODO: adapt color in darkmode to be more visible
        "rainbow-dark": {
          "0%": {
            color: "red",
          },
          "17%": {
            color: "#ff0",
          },
          "33%": {
            color: "#0f0",
          },
          "50%": {
            color: "#0ff",
          },
          "67%": {
            color: "#00f",
          },
          "84%": {
            color: "#f0f",
          },
          to: {
            color: "red",
          },
        },
      },
      animation: {
        "rainbow-light": "rainbow-light 5s linear infinite",
        "rainbow-dark": "rainbow-dark 5s linear infinite",
      },
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};

export default tailwindConfig;
