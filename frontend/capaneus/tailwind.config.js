module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'white-30': 'rgba(255, 255, 255, 0.3)',
        'white-50': 'rgba(255, 255, 255, 0.5)',
        'white-70': 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}