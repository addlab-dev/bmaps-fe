const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.js'],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        12: 'repeat(12, minmax(0, 1fr))',
        11: 'repeat(11, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
      },
      gridRow: {
        'span-1': 'span 1 / span 1',
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
      },
      outline: {
        none: 'none',
      },
    },
    colors: {
      ...colors,
      black: '#153750',
      blue: '#158BCB',
      green: '#C3D976',
      appbg : 'var(--gl-color-secondary)',
      main : 'var(--gl-color-primary)',
      transparent: 'transparent',
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      pointerEvents: ['disabled'],
      borderWidth: ['first', 'last'],
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
