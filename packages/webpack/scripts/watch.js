#! /usr/bin/env node
'use strict';

// Global import
const express = require('express');
const logger = require('signale');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

// Local import
const webpackConfig = require('./webpack.config');
const { HOST, NODE_ENV, PORT } = require('../config/env');
const { publicDir } = require('../config/path');

logger.config({
  displayTimestamp: true
});

function main() {
  // Initialize console
  console.clear();
  logger.start(`Starting build in ${NODE_ENV} mode`);

  // Set DevServer
  let compiler;

  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    throw new Error(err);
  }

  const devServer = express();
  devServer.use(devMiddleware(compiler, webpackConfig.devServer));
  devServer.use(hotMiddleware(compiler, {
    log: false
  }));
  devServer.use(express.static(publicDir));

  // Start server
  devServer.listen(PORT, err => {
    if (err) {
      throw new Error(err);
    }

    logger.complete(`Server is running on http://${HOST}:${PORT}`);
  });
}

try {
  main();
} catch (err) {
  logger.error(err);
}
