const webpack = require('webpack');

module.exports = function override(webpackConfig) {
  webpackConfig.resolve.alias = {
    ...webpackConfig.resolve.alias,
    '@ledgerhq/devices/hid-framing': '@ledgerhq/devices/lib/hid-framing',
  };

  webpackConfig.resolve.fallback = {
    ...webpackConfig.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
  };
  webpackConfig.resolve.extensions = [
    ...webpackConfig.resolve.extensions,
    '.ts',
    '.js',
  ];
  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  return webpackConfig;
};
