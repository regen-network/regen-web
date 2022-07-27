module.exports = {
<<<<<<< HEAD
  extends: [
    'react-app',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
=======
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
>>>>>>> 92528156 (David/eslint simple import sort (#1075))
  rules: {
    'no-empty': 'off',
    'no-console': 'warn',
    'no-useless-escape': 'off',
<<<<<<< HEAD
=======
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react/react-in-jsx-scope': 'off',
>>>>>>> 92528156 (David/eslint simple import sort (#1075))
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
