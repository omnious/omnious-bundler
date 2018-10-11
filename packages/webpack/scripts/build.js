'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

// Global import
const ora = require('ora');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');

// Local import
const log = require('./log');
const remove = require('./remove');
const webpackConfig = require('../src/Bundler');
const { NODE_ENV } = require('../utils/env');
const { distDir } = require('../utils/path');

module.exports.build = async options => {
  try {
    await remove(distDir);
  } catch (err) {
    log.error('Failed to compile', err.messages);
  }

  // Initialize console
  console.clear();
  log.start(`Starting build in ${NODE_ENV} mode`);

  // Create spinner
  const spinner = ora('Building client');
  const buildConfig = webpackConfig(NODE_ENV, options);
  const compiler = webpack(buildConfig);
  spinner.start();

  // Generate bundle files
  compiler.run((err, stats) => {
    if (err) {
      log.error(err);
    } else {
      const rawMessages = stats.toJson({}, true);
      const messages = formatWebpackMessages(rawMessages);
      spinner.stop();

      if (!messages.errors.length && !messages.warnings.length) {
        // Webpack build success
        log.end('Client compiled successfully');
        log.info('Build outputs', stats.toString({ colors: true }));
      }

      if (messages.warnings.length) {
        // Warning occurs
        log.warn('Compiled with warnings', messages.warnings);
        log.info('Build outputs', stats.toString({ colors: true, warnings: false }));
      }

      if (messages.errors.length) {
        // Build fail
        log.error('Failed to compile', messages.errors);
      }
    }
  });
};
