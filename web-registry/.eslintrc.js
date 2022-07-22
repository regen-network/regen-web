const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
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
              // Absolute imports .
              ['^(pages)(/.*|$)', '^(components|hooks|features)(/.*|$)'],
              // Relative imports and assets
              ['^\\.', '^(assets)(/.*|$)'],
            ],
          },
        ],
      },
    },
  ],
};
