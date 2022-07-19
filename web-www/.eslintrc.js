const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  ignorePatterns: ['src/generated/**/*'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
};
