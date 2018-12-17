#! /usr/bin/env node
'use strict';

// Global import
// const opn = require('opn');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { resolve } = require('path');

// Local import
const { logger } = require('../utils/logger');
const webpackConfig = require('../config/webpack.config');
const { HOST, NODE_ENV, PORT } = require('../config/env');
// const { publicDir } = require('../utils/path');

const publicDir = resolve(process.cwd(), 'public');

function main() {
  // Initialize console
  console.clear();
  logger.start(`Starting build in ${NODE_ENV} mode`);

  // Set DevServer
  // const devConfig = webpackConfig(NODE_ENV, options);
  // const compiler = webpack(devConfig);
  let compiler;

  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    throw new Error(err);
  }

  const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);
  // const devServer = new WebpackDevServer(compiler, {
  //   contentBase: publicDir,
  //   historyApiFallback: {
  //     disableDotRule: true
  //   },
  //   host: HOST,
  //   hotOnly: true,
  //   inline: true,
  //   noInfo: true,
  //   port: PORT,
  //   publicPath: devConfig.output.publicPath,
  //   stats: {
  //     colors: true
  //   }
  // });

  // Start server
  devServer.listen(PORT, HOST, err => {
    if (err) {
      throw new Error(err);
    }

    logger.info('Compile client bundles');
  });
}

try {
  main();
} catch (err) {
  logger.error(err);
}
