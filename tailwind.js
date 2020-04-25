const {colors} = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        'agua': '#00ffae'
      },
    },
    gradients: theme => ({
      // Array definition (defaults to linear gradients).
      'topaz':      ['30deg', theme('colors.orange.500'), theme('colors.pink.400')],
      'topaz-dark': ['30deg', theme('colors.orange.700'), theme('colors.pink.600')],
      'emerald':    ['to right', theme('colors.green.400'), theme('colors.teal.500')],
      'fireopal':   ['to right', '#40E0D0', '#FF8C00', '#FF0080'],
      'relay':      ['to top left', '#3A1C71', '#D76D77', '#FFAF7B'],

      // Object definition.
      'mono-circle': {
          type: 'radial',
          colors: ['circle', '#CCC', '#000']
      },
  }),

  },
  variants: {
    gradients: ['responsive', 'hover'],
  },
  plugins: [
    require('tailwindcss-plugins/gradients')
  ],
}
