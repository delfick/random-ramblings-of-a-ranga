module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,svelte}",
    "./src/*.{js,ts,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green-tldr": "#2a7715",
        "dark-back": "#252525",
        "dark-front": "#839495",
        "mark-back": "#d19696",
        "mark-front": "#fff",
        "mark-back-dark": "#d19696",
        "mark-front-dark": "#000",
      },
    },
  },
  plugins: [],
};
