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
      animation: {
        "self-rotate": "self-rotate 0.2s ease-out 3",
        "pulse-loader": "pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) 1",
        "pulse-in": "pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) 1",
      },
      keyframes: {
        "self-rotate": {
          "0%, 100%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
