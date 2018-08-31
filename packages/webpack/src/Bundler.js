'use strict';

// Global import
const { resolve } = require('path');
const { smart } = require('webpack-merge');

// Local import
const commonConfig = require('./webpack.config.common');

module.exports = (env, { add, lang, mode, task }) => {
  const targetLanguage = require(`./utils/${lang}`);
  let additionalConfig = {};

  if (add) {
    additionalConfig = require(resolve(process.cwd(), add));
  }

  switch (env) {
    case 'development': {
      if (task === 'middleware') {
        const devConfig = require('./webpack.config.mid');
        return smart(commonConfig, targetLanguage[mode], devConfig, additionalConfig);
      }

      const devConfig = require('./webpack.config.dev');
      return smart(commonConfig, targetLanguage[mode], devConfig, additionalConfig);
    }
    case 'production': {
      const prodConfig = require('./webpack.config.prod');
      return smart(commonConfig, targetLanguage[mode], prodConfig, additionalConfig);
    }
    case 'test':
    default:
      // TODO: config for test
      return {};
  }
};
