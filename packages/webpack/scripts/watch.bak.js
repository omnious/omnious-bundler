#! /usr/bin/env node
'use strict';

// Global import
// const opn = require('opn');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// Local import
const webpackConfig = require('./webpack.config');
const { logger } = require('../utils/logger');
const { HOST, NODE_ENV, PORT } = require('../config/env');
// const { publicDir } = require('../utils/path');

function main(options) {
  // Initialize console
  // console.clear();
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
  devServer.listen(PORT, err => {
    if (err) {
      logger.error(err);
    }

    // const url = `http://${HOST}:${PORT}`;
    // log.end(`Setting timer to open browser at ${url}, in ${NODE_ENV}`);
  });

  // for (const sig of ['SIGINT', 'SIGTERM']) {
  //   process.on(sig, code => {
  //     log.info('Shutting down app');
  //     devServer.close();
  //     process.exit(code || 0);
  //   });
  // }
}

main();
