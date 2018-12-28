#! /usr/bin/env node
'use strict';

// Global import
const express = require('express');
const { resolve } = require('path');
const logger = require('signale');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

// Local import
const { HOST, NODE_ENV, PORT } = require('../config/env');
const { publicDir } = require('../config/path');
const webpackConfig = require('../config/webpack.config');

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
  devServer.use((req, res, next) => {
    const filename = resolve(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }

      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });

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
