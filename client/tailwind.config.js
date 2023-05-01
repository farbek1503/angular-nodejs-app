/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: [
      "./src/**/*.{html,ts}",
   ],
   theme: {
      extend: {},
      screens: {
         'sm': '640px', // => @media (min-width: 640px) { ... }
         'smM': {
            'max': '639px'
         }, // => @media (max-width: 639px) { ... }


         'md': '768px', // => @media (min-width: 768px) { ... }
         'mdM': {
            'max': '767px'
         }, // => @media (max-width: 767px) { ... }

         'lg': '1024px', // => @media (min-width: 1024px) { ... }
         'lgM': {
            'max': '1023px'
         }, // => @media (max-width: 1023px) { ... }


         'xl': '1280px', // => @media (min-width: 1280px) { ... }
         'xlM': {
            'max': '1279px'
         }, // => @media (max-width: 1279px) { ... }


         '2xl': '1536px', // => @media (min-width: 1536px) { ... }
         '2xlM': {
            'max': '1535px'
         }, // => @media (max-width: 1535px) { ... }

      },
      fontFamily: {
         /* lato - 3, 4, 7 */
         'la': ['Lato', 'sans-serif'],

         /* roboto mono - 3, 4, 5, 7 */
         'po': ['Poppins', 'sans-serif'],
      },
      fontWeight: {
         light: 300,
         regular: 400,
         medium: 500,
         bold: 600,
         black: 700
      }
   },
   plugins: [],
}
