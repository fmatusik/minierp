const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      black: colors.black, 
      primary: "#76caf5",   
      primaryhover: "#4fc3ff",
      red: colors.red,
      green: colors.green
    },
    extend: {},
  },
  plugins: [],
}
