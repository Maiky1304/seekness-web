module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A6CF98",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#EEF6EB",
          300: "#D6E9D0",
          400: "#BEDCB4",
          500: "#A6CF98",
          600: "#85BD72",
          700: "#65A84E",
          800: "#4E823D",
          900: "#375C2B",
        },
        background: {
          DEFAULT: "#2C2F33",
        },
        blurple: {
          DEFAULT: "#5865F2",
        },
        embed: {
          DEFAULT: "#23272A",
        },
      },
    },
  },
  plugins: [],
};
