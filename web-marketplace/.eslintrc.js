const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  ignorePatterns: ['src/generated/*.tsx'],
  overrides: [
    ...baseConfig.overrides,
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
    // Disallow next/link everywhere in src
    {
      files: ['src/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'next/link',
                message: 'Use components/atoms/Link instead of next/link.',
              },
            ],
          },
        ],
      },
    },
    // Allow next/link only inside Link component
    {
      files: ['src/components/atoms/Link.tsx'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
};
