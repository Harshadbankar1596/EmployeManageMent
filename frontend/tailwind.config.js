/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fill-left': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        'fill-right': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        }
      },
      animation: {
        'fill-left': 'fill-left 1s linear both',
        'fill-right': 'fill-right 1s linear both 1s',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}