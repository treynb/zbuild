const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = () => {
  return merge(commonConfig, {
    mode: 'production',
    output: {
      filename: '[name].[chunkhash].js',
    },
    devtool: 'source-map',
    optimization: {
      moduleIds: 'hashed',
      minimizer: [
        new TerserJSPlugin({ extractComments: false }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
            },
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ],
  });
};
