'use strict';

// Global import
const DotenvPlugin = require('dotenv-webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { IgnorePlugin } = require('webpack');

// Local import
const { distDir, packageJson, rootDir, srcDir } = require('./path');

module.exports = {
  output: {
    path: distDir,
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
    },
    plugins: [new ModuleScopePlugin(srcDir, [packageJson])]
  },
  context: rootDir,
  target: 'web',
  // externals: [],
  // stats: '',
  plugins: [new DotenvPlugin(), new IgnorePlugin(/^\.\/locale$/, /moment$/)]
};
