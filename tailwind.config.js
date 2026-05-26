/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#03152e',
          900: '#062044',
          800: '#0a2d5f',
        },
        electric: {
          600: '#075bff',
          500: '#1373ff',
          400: '#37a2ff',
        },
      },
      boxShadow: {
        panel: '0 18px 45px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
