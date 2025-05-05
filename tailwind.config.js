/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        burgundy: {
          50: '#fdf2f4',
          100: '#fbe6e9',
          200: '#f5cdd3',
          300: '#eba5b3',
          400: '#e17a8f',
          500: '#d25070',
          600: '#800020', // Main burgundy color
          700: '#6b001c',
          800: '#570017',
          900: '#4a0015',
          950: '#2e000d',
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) translateX(15px) rotate(5deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(20px) translateX(-15px) rotate(-5deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) translateX(10px) scale(1.05)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: 0.05 },
          '50%': { opacity: 0.2 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.3 },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-15px)' },
          '75%': { transform: 'translateY(15px)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out forwards',
        'float-slow': 'floatSlow 15s ease-in-out infinite',
        'float-medium': 'floatMedium 12s ease-in-out infinite',
        'float-fast': 'floatFast 8s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 10s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'fade-in-out': 'fadeInOut 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'wave': 'wave 10s ease-in-out infinite',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
};