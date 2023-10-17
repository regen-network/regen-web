const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
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
              // Absolute Imports
              ['^(src)(/.*|$)'],
              //  relative imports
              ['^\\.'],
            ],
          },
        ],
      },
    },
  ],
};
