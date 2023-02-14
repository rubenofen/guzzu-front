const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5C46',
        secondary: '#040015'
      },
      fontFamily: {
        sans: ['var(--font-simplon-mono)', ...fontFamily.sans]
      },
      dropShadow: {
        guzzu: '16px 16px 0px black'
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    }
  ]
}
