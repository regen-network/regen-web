// This file defines the common tailwind configuration to be used as the basis
// of each project's tailwind.config.js file.
module.exports = {
  theme: {
    colors: {
      // Make sure these guidelines are followed when adding new colors: https://tailwindcss.com/docs/customizing-colors#using-css-variables
      // Color variables should be added to tailwind.css.
      'primary-main': 'rgb(var(--primary-main) / <alpha-value>)',
      'grey':{
        '50': 'rgb(var(--grey-50) / <alpha-value>)',
        '100': 'rgb(var(--grey-100) / <alpha-value>)',
      },
      'lines-grey': '#D2D5D9'
    },
    spacing: {
      // This spacing scale is based on the actual pixel values converted to REM values.
      // This diverges from tailwind's standard pattern of defining its own spacing numbers
      // but should be easier for developers trying to match spacing to designs in Figma.
      '0': '0',
      '3': '0.1875rem', // 3px
      '5': '0.3125rem', // 5px
      '10': '0.625rem', // 10px
      '15': '0.9375rem', // 15px
      '20': '1.25rem', // 20px
      '25': '1.5625rem', // 25px
      '30': '1.875rem', // 30px
      '40': '2.5rem', // 40px
      '50': '3.125rem', // 50px
      '60': '3.75rem', // 60px
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Preflight needs to be disabled to avoid problems with MUI component styles.
    // This has the side effect that some tailwind styles don't work as expected
    // by default. For instance, in order for borders to show up at all,
    // border-solid is needed whereas it would normally be set by default.
    preflight: false,
  }
}
