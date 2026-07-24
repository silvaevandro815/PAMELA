/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pamela: {
          navy: "#0E2A47",      // Azul Noturno
          gold: "#C89A44",      // Dourado Musical
          goldHover: "#b28639",
          card: "#FFFFFF",      // Branco Puro
          bg: "#F5E9DA",        // Bege Sereno
          bgDarker: "#ebdcc9",
        }
      }
    },
  },
  plugins: [],
};
