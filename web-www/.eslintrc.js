module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
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
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  ignorePatterns: ['generated/*.tsx'],
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
              // generated files, libs & helpers
              [
                '^(generated|graphql|types|mocks)(/.*|$)',
                '^(apollo|sanity|ledger|lib)(/.*|$)',
              ],
              // React-specific - hooks & components
              [
                '^(features|pages)(/.*|$)',
                '^(components)(/.*|$)',
                '^(hooks)(/.*|$)',
              ],
              // Relative imports
              ['^\\.'],
              // assets
              ['^(assets)(/.*|$)'],
            ],
          },
        ],
      },
    },
  ],
};
