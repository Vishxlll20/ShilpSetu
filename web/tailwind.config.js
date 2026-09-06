/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#16304F',
          darker: '#071426',
        },
        saffron: {
          DEFAULT: '#F47C20',
          light: '#F79A55',
          dark: '#D9690E',
        },
        indian: {
          green: '#138808',
        },
        cream: {
          DEFAULT: '#FFF9F0',
          warm: '#FBF1E0',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -12px rgba(11, 31, 58, 0.15)',
        'glow-saffron': '0 0 40px -8px rgba(244, 124, 32, 0.4)',
        'glow-green': '0 0 40px -8px rgba(19, 136, 8, 0.3)',
        'card': '0 20px 60px -20px rgba(11, 31, 58, 0.2)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1.5deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        'waveform': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'waveform': 'waveform 1.2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      backgroundImage: {
        'grid-pattern': 'url("/grid-pattern.svg")',
      },
    },
  },
  plugins: [],
}