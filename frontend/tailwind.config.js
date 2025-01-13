  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
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
