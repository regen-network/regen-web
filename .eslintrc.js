//eslint-disable-next-line
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    // '@typescript-eslint/no-unused-vars': 'off', // TODO enable this line and fix errors
    // '@typescript-eslint/no-explicit-any': 'off', // TODO enable this line and fix errors
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
