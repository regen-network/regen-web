module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  rules: {
    'no-empty': 'off',
    'no-console': 'warn',
    'no-useless-escape': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
};
