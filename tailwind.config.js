module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        '15':'0 1 15%',
        '20':'0 1 20%',
        '25':'0 1 25%',
        '80':'0 1 80%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
