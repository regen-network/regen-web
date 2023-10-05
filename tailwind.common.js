module.exports = {
  theme: {
    colors: {
      'white': '#FFFFFF',
      'background': '#FAFAFA',
      'light-grey': '#EFEFEF'
    },
    spacing: {
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
    // this is needed to avoid problems with MUI component styles
    preflight: false,
  }
}
