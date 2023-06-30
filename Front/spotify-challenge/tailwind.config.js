/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        caprasimo: ['Caprasimo', 'cursive'],
        geologica: ['Geologica', 'sans-serif'],
      },
    },
  },
  purge: ['./src/**/*.tsx'], // Analiza todos los archivos .tsx en la carpeta src y sus subcarpetas
  // ...
};