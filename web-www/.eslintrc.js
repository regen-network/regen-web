const baseConfig = require('../.eslintrc'); // eslint-disable-line

module.exports = {
  ...baseConfig,
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
};
