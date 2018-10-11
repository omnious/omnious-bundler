'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

// Global import
const opn = require('opn');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// Local import
const log = require('./log');
const webpackConfig = require('../src/Bundler');
const { HOST, NODE_ENV, PORT } = require('../utils/env');
const { staticDir } = require('../utils/path');

module.exports.watch = options => {
  // Initialize console
  console.clear();
  log.start(`Starting build in ${NODE_ENV} mode`);

  // Set DevServer
  const devConfig = webpackConfig(NODE_ENV, options);
  const compiler = webpack(devConfig);
  const devServer = new WebpackDevServer(compiler, {
    contentBase: staticDir,
    historyApiFallback: {
      disableDotRule: true
    },
    host: HOST,
    hotOnly: true,
    inline: true,
    noInfo: true,
    port: PORT,
    publicPath: devConfig.output.publicPath,
    stats: {
      colors: true
    }
  });

  // Start server
  devServer.listen(PORT, HOST, err => {
    if (err) {
      log.error(err);
    } else {
      const url = `http://${HOST}:${PORT}`;
      log.end(`Setting timer to open browser at ${url}, in ${NODE_ENV}`);
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
