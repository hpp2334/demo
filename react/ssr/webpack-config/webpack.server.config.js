const {
  ESBuildPlugin
} = require('esbuild-loader');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const comm = require('./webpack.common.config');
const { merge } = require('webpack-merge');

module.exports = merge(comm, {
  entry: ['./server/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist/server'),
    publicPath: '/',
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals()],
})
