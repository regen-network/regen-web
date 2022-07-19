const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  ignorePatterns: ['src/generated/*.tsx'],
  rules: {
    ...baseConfig.rules,
    'react/react-in-jsx-scope': 'off',
  },
};
