'use strict';

// Global import
const { resolve } = require('path');

const rootDir = process.cwd();
const srcDir = resolve(rootDir, 'src');

module.exports.componentsDir = resolve(srcDir, 'components');
module.exports.containersDir = resolve(srcDir, 'containers');
module.exports.distDir = resolve(rootDir, 'dist');
module.exports.hocDir = resolve(srcDir, 'hoc');
module.exports.indexHtml = resolve(srcDir, 'index.html');
module.exports.packageJson = resolve(rootDir, 'package.json');
module.exports.polyfills = resolve(srcDir, 'polyfills');
module.exports.publicDir = resolve(rootDir, 'public');
module.exports.reduxDir = resolve(srcDir, 'redux');
module.exports.srcDir = srcDir;
module.exports.staticDir = resolve(rootDir, 'static');
module.exports.utilsDir = resolve(srcDir, 'utils');
module.exports.vendor = resolve(srcDir, 'vendor');
