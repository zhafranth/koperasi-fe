import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.7" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
