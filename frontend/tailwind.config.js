/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}"

  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'white': '#ffffff',
        'black': '#000000',
        'primary': {
          50: '#E9E8EE',
          200: '#9996AF',
          300: '#6A668B',
          500: '#211A52'
        },
        'secondary': {
          100: '#ffed4a',
        },
        'tertiary': {
          500: '#54616E',
        },
        'bg': {
          50: '#FDFDFE',
          100: '#FAFAFB',
          300: '#F4F4F6'
        },
      },
      keyframes: {
        'pulse-wave': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.5)',
            opacity: '0.7',
          },
        },
      },
      animation: {
        'pulse-wave': 'pulse-wave 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};



