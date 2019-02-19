#! /usr/bin/env node
'use strict';

// Global import
const express = require('express');
const { existsSync } = require('fs');
const { resolve } = require('path');
const logger = require('signale');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

// Local import
const { createConfig } = require('../config/create-config');
const { HOST, NODE_ENV, PORT } = require('../config/env');
const { customConfigJs, publicDir } = require('../config/path');
const devConfig = require('../config/webpack.config.dev');

logger.config({
  displayTimestamp: true
});

function main() {
  // Initialize console
  console.clear();
  logger.start(`Starting build in ${NODE_ENV} mode`);

  // Import custom config
  let customConfig = {};

  if (existsSync(customConfigJs)) {
    try {
      customConfig = require(customConfigJs);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Set DevServer
  const webpackConfig = createConfig(devConfig, customConfig);
  let compiler;

  try {
    compiler = webpack(webpackConfig);
  } catch (error) {
    throw new Error(error);
  }

  const devServer = express();
  devServer.use(devMiddleware(compiler, webpackConfig.devServer));
  devServer.use(
    hotMiddleware(compiler, {
      log: false
    })
  );
  devServer.use(express.static(publicDir));
  devServer.use((req, res, next) => {
    const filename = resolve(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (error, result) => {
      if (error) {
        return next(error);
      }

      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });

  // Start server
  devServer.listen(PORT, error => {
    if (error) {
      throw new Error(error);
    }

    logger.complete(`Server is running on http://${HOST}:${PORT}`);
  });
}

try {
  main();
} catch (error) {
  logger.error(error);
}
