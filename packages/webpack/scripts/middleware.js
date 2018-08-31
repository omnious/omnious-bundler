'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

// Global import
const express = require('express');
const opn = require('opn');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

// Local import
const log = require('./log');
const webpackConfig = require('../src/Bundler');
const { env, host, port } = require('../src/utils/env');

module.exports.middleware = options => {
  // Initialize console
  console.clear();
  log.start(`Starting build in ${env} mode`);

  // Set DevServer
  const devConfig = webpackConfig(env, options);
  const compiler = webpack(devConfig);
  const devServer = express();

  devServer.use(
    devMiddleware(compiler, {
      noInfo: true,
      publicPath: devConfig.output.publicPath,
      stats: {
        colors: true
      }
    })
  );
  devServer.use(hotMiddleware(compiler));

  // Start server
  devServer.listen(port, host, err => {
    if (err) {
      log.error(err);
    } else {
      const url = `http://${host}:${port}`;
      log.end(`Setting timer to open browser at ${url}, in ${env}`);
      opn(url);
    }
  });

  for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, code => {
      log.info('Shutting down app');
      devServer.close();
      process.exit(code || 0);
    });
  }
};
