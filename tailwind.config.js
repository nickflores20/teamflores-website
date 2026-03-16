/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A3E61',
        'dark-navy': '#0F1C2E',
        gold: '#C6A76F',
        sand: '#F0E6D2',
      },
      fontFamily: {
        garamond: ['"EB Garamond"', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
