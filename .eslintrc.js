//eslint-disable-next-line
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
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
    // TODO possibly delete the following - leaving for now in case we want to
    // enforce types on all functions, but the this config setup still enforces
    // on module boundaries, which is the major concern. This allows implicit
    // types as long as they aren't exported

    // '@typescript-eslint/explicit-function-return-type': [
    //   'error',
    //   {
    //     allowExpressions: true,
    //   },
    // ],
    '@typescript-eslint/no-explicit-any': 'off', // TODO enable this line and fix errors
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off', // TODO: enable this line and fix errors
  },
};
