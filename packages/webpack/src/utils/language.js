// Global import
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { ContextReplacementPlugin } = require('webpack');

// Local import
const { srcDir } = require('./path');

module.exports.reactJS = {
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   include: srcDir,
      //   exclude: /node_modules/,
      //   use: 'eslint-loader'
      // },
      {
        test: /\.jsx?$/,
        include: srcDir,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports.reactTS = {
  module: {
    rules: [
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
      tslint: true,
      watch: srcDir
    })
  ]
};

module.exports.angularTS = {
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
      tslint: true,
      watch: srcDir
    })
  ]
};

module.exports.vueJS = {};
