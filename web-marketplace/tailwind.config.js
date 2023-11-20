/** @type {import("tailwindcss").Config} */
module.exports = {
  ...require('../tailwind.common'),
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../web-components/src/**/*.{js,ts,jsx,tsx}',
  ],
};
