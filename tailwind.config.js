module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        palette: {
          dark: '#191A19',
          green: '#1E5128',
          lightgreen: '#4E9F3D',
          beige: '#D8E9A8',
          gray: '#D8E3E7'
        }
      },
      fontFamily: {
        'gugi': ['Gugi', 'cursive'],
        'jost': ['Jost', 'sans-serif'],
        'monda': ['Monda', 'sans-serif'],
        'righteous': ['Righteous', 'cursive']
      },
      keyframes: {
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeout:{
          '0%':{opacity: 1},
          '100%':{opacity: 0}
        }
      },
      animation:{
        fadein: 'fadein 0.3s ease-in 1',
        fadeout: 'fadeout 0.3s ease-out 1'
      },
      gridAutoColumns: {
        '200': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      boxShadow: {
        '3xl': '5px 0px 10px 0px rgba(75, 85, 99, 0.5)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
