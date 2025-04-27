/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7e22ce',
          dark: '#581c87',
          light: '#a855f7'
        },
        accent: '#ecd9fa',
        gold: '#eab308',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rotate': 'rotate 120s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px rgba(234, 179, 8, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(234, 179, 8, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};