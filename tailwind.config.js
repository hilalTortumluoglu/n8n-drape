/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF8F5',
        charcoal: '#1A1A1A',
        gold: '#C9A96E',
        muted: '#8C8C8C',
        border: '#E8E4DF',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      letterSpacing: {
        'brand': '0.3em',
      },
    },
  },
  plugins: [],
};
