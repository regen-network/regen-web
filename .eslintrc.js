module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort', 'flowtype', 'lingui'],
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
    'lingui/no-unlocalized-strings': [
      1,
      {
        ignoreFunction: ['test'],
        ignoreAttribute: ['sx', 'linearGradient'],
        ignoreProperty: [
          'margin',
          'padding',
          'backgroundImage',
          'borderTop',
          'borderBottom',
          'rel',
        ],
      },
    ],
    'lingui/t-call-in-function': 2,
    'lingui/no-single-variables-to-translate': 2,
    'lingui/no-expression-in-message': 2,
    'lingui/no-single-tag-to-translate': 2,
    'lingui/no-trans-inside-trans': 2,
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
