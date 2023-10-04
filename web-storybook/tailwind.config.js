/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    '../web-components/src/**/*.{js,ts,jsx,tsx}',
    '../web-marketplace/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // this is needed to avoid problems with MUI component styles
    preflight: false,
  }
};
