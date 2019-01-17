#! /usr/bin/env node
'use strict';

// Global import
const ora = require('ora');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const logger = require('signale');
const webpack = require('webpack');

// Local import
const { NODE_ENV } = require('../config/env');
const { distDir } = require('../config/path');
const webpackConfig = require('../config/webpack.config.prod');
const { remove } = require('../utils');

logger.config({
  displayTimestamp: true
});

async function main() {
  // Initialize console
  console.clear();
  logger.start(`Starting build in ${NODE_ENV} mode`);

  // Remove previous bundles
  try {
    await remove(distDir);
  } catch (err) {
    throw new Error(err);
  }

  // Set Compiler
  let compiler;

  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    throw new Error(err);
  }

  const spinner = ora('Building client');
  spinner.start();

  compiler.run((err, stats) => {
    if (err) {
      throw new Error(err);
    }

    spinner.stop();
    const rawMessages = stats.toJson({}, true);
    const messages = formatWebpackMessages(rawMessages);

    if (!messages.errors.length && !messages.warnings.length) {
      // Webpack build success
      logger.complete('Client compiled successfully');
      logger.info('Build outputs', stats.toString({ colors: true }));
    }

    if (messages.warnings.length) {
      // Warning occurs
      logger.warn('Compiled with warnings', messages.warnings);
      logger.info('Build outputs', stats.toString({ colors: true, warnings: false }));
    }

    if (messages.errors.length) {
      // Build fail
      throw new Error(messages.errors);
    }
  });
}

try {
  main();
} catch (err) {
  logger.error(err);
}
