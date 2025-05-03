import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#f9f3e1",
          100: "#f2e6c1",
          500: "#d4af37",
          600: "#bf9e32",
          700: "#aa8c2c",
          800: "#9f8329",
          900: "#5f4f19",
          950: "#4a3d13",
        },
        gray: {
          50: "#eeeeee",
          100: "#eeeeee",
          200: "#dfdfdf",
          300: "#bebebe",
          400: "#2c2c2c",
          500: "#2c2c2c",
          600: "#282828",
          700: "#232323",
          800: "#212121",
          900: "#1a1a1a",
          950: "#0f0f0f",
        },
        warning: {
          50: "#fffbe6",
          100: "#fff9d8",
          200: "#fff3b0",
          300: "#ffd700",
          400: "#ffd700",
          500: "#e6c200",
          600: "#ccac00",
          700: "#bfa100",
          800: "#998100",
          900: "#736100",
          950: "#594b00",
        },
        success: {
          100: "#e6f8f2",
          200: "#d9f5eb",
          300: "#b0e9d5",
          400: "#00b979",
          500: "#00a76d",
          600: "#009461",
          700: "#008b5b",
          800: "#006f49",
          900: "#005336",
          950: "#00412a",
        },
        error: {
          100: "#fffeed",
          200: "#ffe5e4",
          300: "#ffcac7",
          400: "#ff5449",
          500: "#e64c42",
          600: "#cc433a",
          700: "#bf3137",
          800: "#99322c",
          900: "#732621",
          950: "#591d1a",
        },
      },
    },
  },
};

export default config;
