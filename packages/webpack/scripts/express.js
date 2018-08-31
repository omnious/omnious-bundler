'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

// Global import
const express = require('express');
const opn = require('opn');
const { resolve } = require('path');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

// Local import
const log = require('./log');
const webpackConfig = require('../src/Bundler');
const { env, host, port } = require('../src/utils/env');

module.exports.useExpress = options => {
  // Initialize console
  console.clear();
  log.start(`Starting build in ${env} mode`);

  // Set DevServer
  const devConfig = webpackConfig(env, options);
  const compiler = webpack(devConfig);
  const devServer = express();

  // Set middleware
  devServer.use(
    devMiddleware(compiler, {
      logLevel: 'warn',
      publicPath: devConfig.output.publicPath
    })
  );
  devServer.use(hotMiddleware(compiler));
  devServer.use('*', (req, res, next) => {
    const filename = resolve(devConfig.output.path, 'index.html');
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
      process.exit(code || 0);
    });
  }
};
