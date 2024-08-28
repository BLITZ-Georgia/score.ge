import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "userList-light": "#0E1D26",
      "border-color": "border-color: #E0E1E2",
      white: "#fff",
      "gey-league": "#7F8385",
      "prediction-color": "#00141E",
      "prediction-team-title": "#555E61",
    },
  },
  plugins: [],
};
export default config;
