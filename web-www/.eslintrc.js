const baseConfig = require('../.eslintrc'); // eslint-disable-line

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    '@typescript-eslint/no-var-requires': 'off',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
};
