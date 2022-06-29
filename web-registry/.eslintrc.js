const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  ignorePatterns: ['src/generated/*.tsx'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
