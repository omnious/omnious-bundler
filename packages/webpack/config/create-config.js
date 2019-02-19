// Global import
const { smart } = require('webpack-merge');

// Local import
const commonConfig = require('./webpack.config.common');

module.exports.createConfig = (baseConfig, customConfig) =>
  smart(commonConfig, baseConfig, customConfig);
