/** @type {import("tailwindcss").Config} */
module.exports = {
  ...require("../tailwind.common"),
  content: [
    '../web-components/src/**/*.{js,ts,jsx,tsx}',
    '../web-marketplace/src/**/*.{js,ts,jsx,tsx}',
  ],
};
