/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'box-light': '0px 10px 15px -3px rgba(0,0,0,0.1)',
      },
      fontFamily: {
        playwrite: ['Playwrite', 'sans-serif'],
      },
      colors: {
        'green-light': '#A0C878',
        'green-dark' : '#626F47',
        'beige-light': '#F0BB78',
        'dark-blue': '#077A7D',
      },
    },
  },
  plugins: [],
}