'use strict';

const DotenvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const {
  CDN_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_PIXEL_ID,
  GA_TRACKING_ID,
  NAVER_APP_ID
} = require('../config/env');
const { indexHtml, rootDir, srcDir } = require('../config/path');

module.exports = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?noInfo=true', srcDir],
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: srcDir,
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        include: srcDir,
        exclude: /node_modules/
      },
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
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(ts|tsx)$/,
          /\.(css|scss)$/,
          /\.svg$/,
          /\.(jpg|png)$/,
          /\.md$/
        ],
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.css', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': srcDir
    }
  },
  // performance: {},
  devtool: 'cheap-module-source-map',
  context: rootDir,
  target: 'web',
  // externals: [],
  // serve: {},
  // stats: '',
  devServer: {
    logLevel: 'error',
    publicPath: '/',
    watchOptions: {
      aggregateTimeout: 200,
      ignored: /node_modules/
    }
  },
  plugins: [
    new DotenvPlugin(),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: indexHtml,
      templateParameters: {
        CDN_URL,
        FACEBOOK_APP_ID,
        FACEBOOK_PIXEL_ID,
        GA_TRACKING_ID,
        NAVER_APP_ID
      }
    })
  ]
};
