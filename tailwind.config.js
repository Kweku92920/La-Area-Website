/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Clarity City"', '"Montserrat"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Forum"', '"Clarity City"', '"Montserrat"', 'sans-serif'],
        mono: ['"Clarity City"', '"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
