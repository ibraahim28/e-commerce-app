/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      black: {
        100: "#d3d3d3",
        200: "#a6a6a6",
        300: "#7a7a7a",
        400: "#4d4d4d",
        500: "#212121",
        600: "#1a1a1a",
        700: "#141414",
        800: "#0d0d0d",
        900: "#070707",
      },

      colors: {
        "fresh-green": "#4CAF50",
        "tomato-red": "#E53935",
        "warm-yellow": "#FFC107",
        "rust-orange": "#FF7043",
        "dark-charcoal": "#212121",
        "soft-beige": "#F5F5F5",
        "mint-green": "#81C784",
        "light-coral": "#FFCDD2",
      },
    },
  },
  plugins: [],
};
