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
      primary: "#a9def9",   
    },
    extend: {},
  },
  plugins: [],
}
