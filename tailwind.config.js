/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "very-light-blue": "#F2F4FF",
        "very-light-grey": "#F7F8FD",
        "slate-blue": "#3A4374",
        "medium-grey": "#647196",
        "light-orange": "#F49F85",
        "sky-blue": "#62BCFA",
        "simple-purple": "#AD1FEA",
        "simple-blue": "#4661E6",
        "custom-slate": "#4661E6",
      },
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
