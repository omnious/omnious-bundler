'use strict';

/**
 * COMMON WEBPACK CONFIG
 */

// Global import
const DotenvPlugin = require('dotenv-webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { IgnorePlugin } = require('webpack');

// Local import
const {
  componentsDir,
  containersDir,
  distDir,
  hocDir,
  packageJson,
  reduxDir,
  srcDir,
  utilsDir
} = require('../utils/path');

module.exports = {
  output: {
    path: distDir,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcDir,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: '@svgr/webpack',
            options: {
              babel: false
            }
          },
          'file-loader'
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      },
      {
        test: /\.(gif|otf|ttf)$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.css', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@components': componentsDir,
      '@containers': containersDir,
      '@hoc': hocDir,
      '@redux': reduxDir,
      '@utils': utilsDir
    },
    plugins: [new ModuleScopePlugin(srcDir, [packageJson])]
  },
  plugins: [
    new DotenvPlugin({
      systemvars: true
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
