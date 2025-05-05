/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'box-light': '0px 0px 10px -2px rgba(0,0,0,0.1)',
      },
      fontFamily: {
        playwrite: ['Playwrite', 'sans-serif'],
        monserrat_medium: ['Montserra-medium','sans-serif'],
      },
      colors: {
        'green-light': '#A0C878',
        'green-dark' : '#626F47',
        'beige-light': '#F0BB78',
        'beige-hyper-light': '#F5ECD5',
        'dark-blue': '#077A7D',
        'dark-blue-light': '#27667B',
        'brown': '#BF9264',
        'dark-orange': '#FA812F',
        'mytodo-red-800': '#A62C2C',
        'light-gray': '#FBFBFB',
      },
      fontSize: {
        '2xs':'8px'
      },
    },
  },
  plugins: [],
}
