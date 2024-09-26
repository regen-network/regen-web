/* eslint-disable lingui/no-unlocalized-strings */
// This file defines the common tailwind configuration to be used as the basis
// of each project's tailwind.config.js file.
module.exports = {
  theme: {
    fontFamily: {
      sans: ['"Lato"', '-apple-system', 'sans-serif'],
      muli: ['"Muli"', '-apple-system', 'sans-serif'],
      montserrat: ['"Montserrat"', '-apple-system', 'sans-serif'],
    },
    colors: {
      // Make sure these guidelines are followed when adding new colors: https://tailwindcss.com/docs/customizing-colors#using-css-variables
      // Color variables should be added to tailwind.css.
      brand: {
        400: 'rgb(var(--brand-400) / <alpha-value>)',
        300: 'rgb(var(--brand-300) / <alpha-value>)',
        200: 'rgb(var(--brand-200) / <alpha-value>)',
        100: 'rgb(var(--brand-100) / <alpha-value>)',
      },
      grey: {
        0: 'rgb(var(--grey-0) / <alpha-value>)',
        100: 'rgb(var(--grey-100) / <alpha-value>)',
        200: 'rgb(var(--grey-200) / <alpha-value>)',
        300: 'rgb(var(--grey-300) / <alpha-value>)',
        400: 'rgb(var(--grey-400) / <alpha-value>)',
        500: 'rgb(var(--grey-500) / <alpha-value>)',
        600: 'rgb(var(--grey-600) / <alpha-value>)',
        700: 'rgb(var(--grey-700) / <alpha-value>)',
      },
      warning: {
        400: 'rgb(var(--warning-400) / <alpha-value>)',
        300: 'rgb(var(--warning-300) / <alpha-value>)',
        200: 'rgb(var(--warning-200) / <alpha-value>)',
        100: 'rgb(var(--warning-100) / <alpha-value>)',
      },
      error: {
        400: 'rgb(var(--error-400) / <alpha-value>)',
        300: 'rgb(var(--error-300) / <alpha-value>)',
        200: 'rgb(var(--error-200) / <alpha-value>)',
        100: 'rgb(var(--error-100) / <alpha-value>)',
      },
      blue: {
        400: 'rgb(var(--blue-400) / <alpha-value>)',
        300: 'rgb(var(--blue-300) / <alpha-value>)',
        200: 'rgb(var(--blue-200) / <alpha-value>)',
        100: 'rgb(var(--blue-100) / <alpha-value>)',
        50: 'rgb(var(--blue-50) / <alpha-value>)',
        0: 'rgb(var(--blue-0) / <alpha-value>)',
      },
      purple: {
        400: 'rgb(var(--purple-400) / <alpha-value>)',
        300: 'rgb(var(--purple-300) / <alpha-value>)',
        200: 'rgb(var(--purple-200) / <alpha-value>)',
        100: 'rgb(var(--purple-100) / <alpha-value>)',
      },
    },
    spacing: {
      // This spacing scale is based on the actual pixel values converted to REM values.
      // This diverges from tailwind's standard pattern of defining its own spacing numbers
      // but should be easier for developers trying to match spacing to designs in Figma.
      0: '0',
      1: '0.0625rem', // 1px
      3: '0.1875rem', // 3px
      5: '0.3125rem', // 5px
      10: '0.625rem', // 10px
      15: '0.9375rem', // 15px
      20: '1.25rem', // 20px
      25: '1.5625rem', // 25px
      30: '1.875rem', // 30px
      35: '2.1875rem', // 35px
      40: '2.5rem', // 40px
      45: '2.8125rem', // 45px
      50: '3.125rem', // 50px
      60: '3.75rem', // 60px
    },
    extend: {
      backgroundImage: {
        'prefinance-gradient':
          'linear-gradient(24deg, rgba(81, 93, 137, 0.10) 2.82%, rgba(125, 201, 191, 0.10) 23.42%, rgba(250, 235, 209, 0.10) 79.07%)',
        'purple-gradient':
          'linear-gradient(179deg,#515D89 19.77%,#7DC9BF 114.05%,#FAEBD1 200.67%)',
        'blue-green-gradient':
          'linear-gradient(197deg, #7D9AA2 8.02%, #9AD3BE 43.42%, #D1E2C7 78.83%)',
      },
      boxShadow: {
        sm: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
        md: '0px 4px 10px 0px rgba(0, 0, 0, 0.05), 0px 0px 10px 0px rgba(250, 250, 216, 0.80)',
      },
      fontWeight: {
        inherit: 'inherit',
      },
      backgroundColor: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Preflight needs to be disabled to avoid problems with MUI component styles.
    // This has the side effect that some tailwind styles don't work as expected
    // by default. For instance, in order for borders to show up at all,
    // border-solid is needed whereas it would normally be set by default.
    preflight: false,
  },
  darkMode: 'class',
};
