const {
  ESBuildPlugin
} = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const comm = require('./webpack.common.config');

module.exports = merge(comm, {
  entry: [path.join(__dirname, '../client/index.js')],
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.join(__dirname, '../dist/client'),
    publicPath: '/',
  },
  mode: 'development',
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, '../client/index.html'),
    //   filename: 'template.html',
    // }),
  ]
});