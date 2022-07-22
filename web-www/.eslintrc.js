const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  ignorePatterns: ['src/generated/**/*'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
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
              // Relative imports and assets
              ['^\\.', '^(assets)(/.*|$)'],
            ],
          },
        ],
      },
    },
  ],
};
