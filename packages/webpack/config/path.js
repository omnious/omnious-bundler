'use strict';

// Global import
const { resolve } = require('path');

const rootDir = process.cwd();
const publicDir = resolve(rootDir, 'public');
const srcDir = resolve(rootDir, 'src');

module.exports.componentsDir = resolve(srcDir, 'components');
module.exports.containersDir = resolve(srcDir, 'containers');
module.exports.contextsDir = resolve(srcDir, 'contexts');
module.exports.customConfigJs = resolve(rootDir, 'webpack.config.js');
module.exports.distDir = resolve(rootDir, 'dist');
module.exports.dotenv = resolve(rootDir, '.env');
module.exports.hocDir = resolve(srcDir, 'hoc');
module.exports.packageJson = resolve(rootDir, 'package.json');
module.exports.polyfills = resolve(srcDir, 'polyfills');
module.exports.publicDir = publicDir;
module.exports.reduxDir = resolve(srcDir, 'redux');
module.exports.rootDir = rootDir;
module.exports.srcDir = srcDir;
module.exports.staticDir = resolve(rootDir, 'static');
module.exports.indexHtml = resolve(publicDir, 'index.html');
module.exports.utilsDir = resolve(srcDir, 'utils');
