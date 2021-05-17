module.exports = {
  purge: ['./index.html', './src/**/*.vue'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    extend: {
      fontFamily: {
          body: ['Open Sans, sans-serif'],
      },
      colors: {
          background: {
              lighter: '#1f242b',
              light: '#1a1d24',
              n: '#15181e',
              dark: '#111318',
          },
          brand: {
              light: '#99c3f9',
              n: '#80B4F7',
              dark: '#6690c6',
          },
          grad: {
              to: '#509afc',
              from: '#80b4f7',
          }
      },
  },
   },
   variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    backgroundColor: ['responsive', 'hover', 'focus', 'checked'],
    cursor: ['disabled'],
},
   plugins: [],
 }