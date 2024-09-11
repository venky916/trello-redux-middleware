/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors :{
        "black": "#191919",
        "white":"#FFFFFF",
        "l-white" : "#D4D4D4",
        "t-white" : "#9C9C9C",
        "orange" :"#FF4C00",
        'light-orange': '#FFD580',
      }
    },
  },
  plugins: [],
}