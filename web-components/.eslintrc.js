const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
<<<<<<< HEAD
=======
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
              //  relative imports
              ['^\\.'],
            ],
          },
        ],
      },
    },
  ],
>>>>>>> 92528156 (David/eslint simple import sort (#1075))
};
