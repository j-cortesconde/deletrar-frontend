/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      color: {
        text: "#5c6ac4",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /line-clamp-(1|2|3|4|5|6|7|8|9|10)/,
    },
  ],
};
