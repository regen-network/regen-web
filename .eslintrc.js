module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort', 'flowtype'],
  rules: {
    'no-empty': 'off',
    'no-console': 'warn',
    'no-useless-escape': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
