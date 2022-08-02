const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  stories: [
    '../../web-components/src/components/**/*.stories.tsx',
    '../../web-registry/src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
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
  webpackFinal: async config => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../../web-registry/tsconfig.json'),
      }),
      new TsconfigPathsPlugin({
        configFile: path.resolve(
          __dirname,
          '../../web-components/tsconfig.json',
        ),
      }),
    ];
    return config;
  },
};
