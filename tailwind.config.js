/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-bricolage)', 'sans-serif'],
        serif: ['var(--font-bricolage)', 'sans-serif'],
        heading: ['var(--font-bricolage)', 'sans-serif'],
        mono: ['var(--font-bricolage)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
