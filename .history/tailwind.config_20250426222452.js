/** @type {import('tailwindcss').Config} */
import scrollbar from 
export default {
  content: ["./*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: '#4f6f52',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
