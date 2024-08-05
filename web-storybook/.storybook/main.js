const { mergeConfig } = require('vite');
const tsconfigPaths = require('vite-tsconfig-paths').default;
const svgrPlugin = require('vite-plugin-svgr').default;
import { lingui } from '@lingui/vite-plugin';
import macrosPlugin from 'vite-plugin-babel-macros';

const {
  NodeGlobalsPolyfillPlugin,
} = require('@esbuild-plugins/node-globals-polyfill');
const path = require('path');

module.exports = {
  stories: [
    '../../web-components/src/**/*.stories.tsx',
    '../../web-marketplace/src/**/*.stories.tsx',
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
  async viteFinal(config, { configType }) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        alias: {
          components: path.resolve(
            __dirname,
            '../../web-marketplace/src/components',
          ),
          lib: path.resolve(__dirname, '../../web-marketplace/src/lib'),
          routes: path.resolve(__dirname, '../../web-marketplace/src/routes'),
          generated: path.resolve(
            __dirname,
            '../../web-marketplace/src/generated',
          ),
          pages: path.resolve(__dirname, '../../web-marketplace/src/pages'),
          features: path.resolve(
            __dirname,
            '../../web-marketplace/src/features',
          ),
          hooks: path.resolve(__dirname, '../../web-marketplace/src/hooks'),
          styles: path.resolve(__dirname, '../../web-marketplace/src/styles'),
          utils: path.resolve(__dirname, '../../web-marketplace/src/utils'),
          assets: path.resolve(__dirname, '../../web-marketplace/src/assets'),
          config: path.resolve(__dirname, '../../web-marketplace/src/config'),
          ledger: path.resolve(__dirname, '../../web-marketplace/src/ledger'),
          clients: path.resolve(__dirname, '../../web-marketplace/src/clients'),
        },
      },
      plugins: [
        macrosPlugin(),
        lingui(),
        svgrPlugin({
          include: path.resolve(
            __dirname,
            '../../web-marketplace/src/**/*.svg',
          ),
        }),
      ],
      optimizeDeps: {
        // https://github.com/mui/material-ui/issues/32727#issuecomment-1697253782
        include: [
          '@mui/material/Tooltip',
          '@emotion/styled',
          '@mui/material/Unstable_Grid2',
        ],
        esbuildOptions: {
          plugins:[
            NodeGlobalsPolyfillPlugin({
              buffer: true,
              process: true,
            }),
          ]
        },
      },
    });
  },
};
