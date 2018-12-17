'use strict';

module.exports = {
  mode: 'production',
  entry: '',
  output: {},
  module: {
    rules: []
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.css', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': srcDir
    }
  },
  performance: {},
  devtool: 'source-map',
  context: process.cwd(),
  target: 'web',
  externals: [],
  serve: {},
  stats: '',
  devServer: {},
  plugins: []
};
