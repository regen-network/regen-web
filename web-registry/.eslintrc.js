const baseConfig = require('../.eslintrc'); // eslint-disable-line

module.exports = {
  ...baseConfig,
  ignorePatterns: ['src/generated/*.tsx'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
};
