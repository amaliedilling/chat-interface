/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}"

  ],
  darkMode: 'media',
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
          500: '#211A52' // AAU blue
        },
        'secondary': {
          100: '#ffed4a',
          500: '#594fbf',
        },
        'tertiary': {
          500: '#54616E',
        },
        'bg': {
          50: '#FDFDFE',
          100: '#FAFAFB',
          300: '#F4F4F6'
        },
        'error': {
          500: '#B3261E',
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
      fontSize: {
        // Footer
        xs: ['8px', '1rem'], // Small screens
        sm: ['10px', '1rem'], // Larger screens

        // Plain Text
        bodySmall: ['11px', '1.25rem'], // Small screens
        bodyMedium: ['12px', '1.5rem'], // Medium screens
        bodyLarge: ['14px', '1.75rem'], // Large screens

        // Headers
        headerSmall: ['16px', '2rem'], // Small headers
        headerMedium: ['18px', '2.25rem'], // Medium headers
        headerLarge: ['20px', '2.5rem'], // Large headers

        // Title and Subtitle
        title: ['24px', '2.75rem'], // Main title
        subtitle: ['20px', '2.5rem'], // Subheader
      },
      fontWeight: {
        light: 300,
        normal: 400,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
    },
  },
  plugins: [],
};



