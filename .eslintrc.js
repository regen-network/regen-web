module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
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
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages. `react` related packages come first.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ['^react', '^@?\\w'],
              // web-components
              ['^(web-components)(/.*|$)'],
              // assets and generated files
              ['^(generated|graphql|types)(/.*|$)'],
              // Absolute imports and Relative imports.
              [
                '^(components|hooks|features|util|lib|pages|apollo|sanity|ledger)(/.*|$)',
                '^\\.',
              ],
              // mocks, assets
              ['^(mocks|assets|static)(/.*|$)', '^[^.]'],
            ],
          },
        ],
      },
    },
  ],
};
