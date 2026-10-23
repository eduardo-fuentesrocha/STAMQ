import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        municipio: {
          blue: "#0F2D59",       // Azul principal institucional
          blueHover: "#0A1F3D",  // Azul más oscuro para efectos hover
          lightBlue: "#2A9EDA",  // Azul claro para fondos/badges
          gold: "#C69214",       // Acento dorado opcional
        },
      },
    },
  },
  plugins: [],
};

export default config;