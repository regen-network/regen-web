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
        'lingui/no-unlocalized-strings': [
          1,
          {
            ignoreFunction: ['test'],
            ignoreAttribute: ['sx', 'linearGradient'],
          },
        ],
        'lingui/t-call-in-function': 2,
        'lingui/no-single-variables-to-translate': 2,
        'lingui/no-expression-in-message': 2,
        'lingui/no-single-tag-to-translate': 2,
        'lingui/no-trans-inside-trans': 2,
      },
    },
  ],
};
