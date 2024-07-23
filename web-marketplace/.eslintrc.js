const { plugin } = require('@graphql-codegen/introspection');
const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  ignorePatterns: ['src/generated/*.tsx'],
  plugins: [...baseConfig.plugins, 'lingui'],
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
  ],
};
