require('babel-polyfill');
require('babel-register')({
  presets: ['es2015', 'react', 'stage-0']
});
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const ENV = require('../config/env').ENV;

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };
  const compileTimeConstantForMinification = { __PRODUCTION__: JSON.stringify(production) };
  const environment = { 'process.env.NODE_ENV': JSON.stringify(ENV) };

  if (!production && !browser) {
    return [
      new webpack.DefinePlugin(environment),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions),
    ];
  }
  if (!production && browser) {
    return [
      new webpack.DefinePlugin(environment),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ];
  }
  if (production && !browser) {
    return [
      new webpack.DefinePlugin(environment),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (production && browser) {
    return [
      new webpack.DefinePlugin(environment),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
        allChunks: true,
      }),
      webpack.optimize.minimize,
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ManifestPlugin({
        fileName: 'manifest.json',
        publicPath: ''
      })
    ];
  }
  return [];
};
