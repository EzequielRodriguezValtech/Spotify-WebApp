/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    fontFamily: {
      'open-sans': ['Open Sans', 'sans-serif'],
    },
  },
  purge: ['./src/**/*.tsx'], // Analiza todos los archivos .tsx en la carpeta src y sus subcarpetas
  // ...
};
