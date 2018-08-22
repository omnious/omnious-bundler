'use strict';

// Global import
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { ContextReplacementPlugin } = require('webpack');

// Local import
const { srcDir } = require('./path');

module.exports.react = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcDir,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        include: srcDir,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      watch: srcDir
    })
  ]
};

module.exports.angular = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: srcDir,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          'angular2-template-loader'
        ]
      }
    ]
  },
  plugins: [
    new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, srcDir),
    new ForkTsCheckerWebpackPlugin({
      watch: srcDir
    })
  ]
};

module.exports.vue = {};
