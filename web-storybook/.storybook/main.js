const tsconfigPaths = require('vite-tsconfig-paths').default;
const { mergeConfig } = require('vite');
const path = require('path');

module.exports = {
  stories: [
    '../../web-components/src/components/**/*.stories.tsx',
    //'../../web-registry/src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    'storybook-addon-react-router-v6',
  ],
  features: { emotionAlias: false }, // https://github.com/mui-org/material-ui/issues/24282#issuecomment-1000619912
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        plugins: [
          tsconfigPaths({
            root: path.resolve(__dirname, '.'),
            projects: [
              path.resolve(__dirname, '../../web-components/tsconfig.json'),
              //path.resolve(__dirname, '../../web-registry/tsconfig.json'),
            ],
          }),
        ],
      },
    });
  },
};
