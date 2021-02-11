module.exports = {
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Questrial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('./src/styles/tailwind')],
  purge: {
    enable: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.html',
      './src/**/*.pug',
      './src/**/*.md',
      './docs/**/*.md',
      './blog/**/*.md',
    ],
    options: {
      whitelist: [
        'body',
        'html',
        'img',
        'a',
        'g-image',
        'g-image--lazy',
        'g-image--loaded',
        'active',
      ],
    },
  },
}
