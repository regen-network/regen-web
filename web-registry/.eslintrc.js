const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  ignorePatterns: ['src/generated/*.tsx'],
};
