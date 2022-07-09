const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
