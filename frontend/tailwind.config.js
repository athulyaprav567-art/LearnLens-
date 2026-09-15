/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bodoni Moda'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        ivory:     "#F5EDE0",
        cream:     "#FFFBF5",
        beige:     "#EAD9C3",
        espresso:  "#3B2A1E",
        coffee:    "#7A5C46",
        border:    "#C7AE8F",
        maroon:    "#6E2A3A",
        forest:    "#2C4A3B",
        mustard:   "#C4972F",
        terra:     "#A9684F",
      },
    },
  },
  plugins: [],
}