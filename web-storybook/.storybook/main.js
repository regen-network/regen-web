const { mergeConfig } = require('vite');
const tsconfigPaths = require('vite-tsconfig-paths').default;
const svgrPlugin = require('vite-plugin-svgr').default;

const {
  NodeGlobalsPolyfillPlugin,
} = require('@esbuild-plugins/node-globals-polyfill');
const path = require('path');

module.exports = {
  stories: [
    '../../web-components/src/components/**/*.stories.tsx',
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
        },
      },
      plugins: [
        svgrPlugin({
          include: path.resolve(
            __dirname,
            '../../web-marketplace/src/**/*.svg',
          ),
        }),
        tsconfigPaths({
          root: path.resolve(__dirname, '.'),
          projects: [
            path.resolve(__dirname, '../../web-components/tsconfig.json'),
            path.resolve(__dirname, '../../web-marketplace/tsconfig.json'),
          ],
        }),
      ],
      optimizeDeps: {
        esbuildOptions: {
          plugins:
            configType === 'DEVELOPMENT'
              ? [
                  NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    process: true,
                  }),
                ]
              : undefined,
        },
      },
    });
  },
};
