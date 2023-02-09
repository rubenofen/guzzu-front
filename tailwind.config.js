const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#124A36',
        'primary-dark': '#134033',
        secondary: '#9E80F7',
        terciary: '#E7EDEB',
        obscure: '#161925',
      },
      fontFamily: {
        secondary: ['var(--font-pp-editorial-new)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
