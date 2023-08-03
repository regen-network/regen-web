module.exports = function override(webpackConfig) {
  webpackConfig.resolve.alias = {
    ...webpackConfig.resolve.alias,
    '@ledgerhq/devices/hid-framing': '@ledgerhq/devices/lib/hid-framing',
    '@ledgerhq/cryptoassets/data/evm/index':
      '@ledgerhq/cryptoassets/lib/data/evm/index',
    '@ledgerhq/cryptoassets/data/eip712':
      '@ledgerhq/cryptoassets/lib/data/eip712',
  };

  return webpackConfig;
};
