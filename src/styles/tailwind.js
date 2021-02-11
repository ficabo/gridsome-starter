// see https://tailwindcss.com/docs/plugins
// see https://github.com/tailwindlabs/tailwindcss/discussions/2049 for using @apply

const plugin = require('tailwindcss/plugin')

const utilities = {
  '.add-clickable-area': {
    '@apply inline-block relative z-10 p-2 -m-2': {},
  },
}

module.exports = plugin(({ addUtilities }) => {
  addUtilities(utilities)
})
