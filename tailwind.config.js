/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./page/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customPurple: '#AB51E3',
        lightPurple: '#D6B2F3',
        darkPurple: '#4B007A',
        colorpur : '#B977E1',
        P0color : '#F0BFBF',
        Butn : '#4F1B70',
        cardsColor:'#8B2FC9',
        descpcolor : '#E0D4D4',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

