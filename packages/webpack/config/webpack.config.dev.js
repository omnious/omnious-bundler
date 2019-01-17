'use strict';

// Global import
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { smart } = require('webpack-merge');

// Local import
const {
  CDN_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_PIXEL_ID,
  GA_TRACKING_ID,
  NAVER_APP_ID
} = require('./env');
const { indexHtml, srcDir } = require('./path');
const commonConfig = require('./webpack.config.common');

module.exports = smart(commonConfig, {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?noInfo=true', srcDir],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
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
  devtool: 'cheap-module-source-map',
  devServer: {
    logLevel: 'error',
    publicPath: '/',
    watchOptions: {
      aggregateTimeout: 200,
      ignored: /node_modules/
    }
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: indexHtml,
      templateParameters: {
        CDN_URL,
        FACEBOOK_APP_ID,
        FACEBOOK_PIXEL_ID,
        GA_TRACKING_ID,
        NAVER_APP_ID
      },
      inject: true
    })
  ]
});
