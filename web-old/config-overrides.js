const path = require('path');

module.exports = function override(config) {
  config.plugins = config.plugins.filter(plugin => {
    return plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin';
  });
  return config;
};