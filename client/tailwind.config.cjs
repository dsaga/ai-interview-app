module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        animation: {
          slideDown: 'slideDown 0.7s ease-out forwards',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms')
    ],
  }