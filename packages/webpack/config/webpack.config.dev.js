'use strict';

/**
 * DEV WEBPACK CONFIG
 */

// Global import
const DotenvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

// Local import
const {
  CDN_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_PIXEL_ID,
  GA_TRACKING_ID,
  HOST,
  NAVER_APP_ID,
  PORT
} = require('../utils/env');
const { dotenv, indexHtml, srcDir } = require('../utils/path');

module.exports = {
  mode: 'development',
  entry: [`webpack-dev-server/client?http://${HOST}:${PORT}`, srcDir],
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: 'inline-source-map',
  plugins: [
    new DotenvPlugin({
      path: dotenv
    }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: indexHtml,
      templateParameters: {
        CDN_URL,
        FACEBOOK_APP_ID,
        FACEBOOK_PIXEL_ID,
        GA_TRACKING_ID,
        NAVER_APP_ID
      },
      inject: true,
      chunksSortMode: 'none'
    })
  ]
};
