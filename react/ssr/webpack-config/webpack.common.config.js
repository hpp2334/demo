const {
  ESBuildPlugin
} = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.mjs', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new ESBuildPlugin(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new LoadablePlugin(),
  ],
}
