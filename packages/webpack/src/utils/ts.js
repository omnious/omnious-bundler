'use strict';

// Global import
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
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
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
  plugins: [new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, srcDir)]
};

module.exports.vue = {};
