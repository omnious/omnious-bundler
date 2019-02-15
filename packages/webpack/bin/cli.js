#!/usr/bin/env node
'use strict';

const { spawnSync } = require('child_process');
const program = require('commander');

const packageJson = require('../package');

let taskName;
program
  .version(packageJson.version, '-v, --version')
  .arguments('<task>')
  .usage('<task>')
  .action(name => {
    taskName = name;
  })
  .parse(process.argv);

function webpackScript(task, options) {
  switch (task) {
    case 'build':
    case 'watch':
    case 'test': {
      const result = spawnSync('node', [require.resolve(`../scripts/${task}`)], {
        stdio: 'inherit'
      });
      process.exit(result.status);
      break;
    }
    default:
      console.log(`Unknown task: ${task}.`);
  }
}

webpackScript(taskName, {
  mode: program.mode || 'react'
});
