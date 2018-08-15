'use strict';

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
      }
    ]
  }
};
