#! /usr/bin/env node
'use strict';

const { logger } = require('../utils/logger');

module.exports.webpackScript = (task, options) => {
  switch (task) {
    case 'build':
    case 'watch': {
      const { watch } = require('./watch');
      watch(options);
      break;
    }
    default:
      logger.error(`Unknown taskName: ${task}.
        Usage: omnious-webpack <task> [options]
      `);
  }
};

// function webpackScript(task, options = {}) {
//   switch (task) {
//     case 'build': {
//       const { build } = require('../scripts/build');
//       build(options);
//       break;
//     }
//     case 'watch': {
//       const { watch } = require('../scripts/watch');
//       watch(options);
//       break;
//     }
//     case 'koa': {
//       const { useKoa } = require('../scripts/koa');
//       const mergedOptions = {
//         ...options,
//         task
//       };
//       useKoa(mergedOptions);
//       break;
//     }
//     case 'test':
//     default:
//       return log.error(`Unknown task: ${task}`);
//   }
// }
