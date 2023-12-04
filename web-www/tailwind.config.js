/** @type {import("tailwindcss").Config} */
module.exports = {
  ...require('../tailwind.common'),
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../web-components/src/**/*.{js,ts,jsx,tsx}',
  ],
};
