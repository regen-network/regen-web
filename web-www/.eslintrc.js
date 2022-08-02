const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
};
