const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const yargsParser = require('yargs-parser');
const commonConfig = require('./webpack.common');

module.exports = () => {
  const buildEnv = yargsParser(process.env.BUILD_ARGV_STR)['def_publish_env'];
  const host = buildEnv === 'daily' ? 'dev.g.alicdn.com' : 'g.alicdn.com';
  const version = `${process.env.BUILD_GIT_BRANCH}`.match(/\d+\.\d+\.\d+/)[0];
  const publicPath = `//${host}/${process.env.BUILD_GIT_GROUP}/${process.env.BUILD_GIT_PROJECT}/${version}`;

  return merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
      publicPath,
    },
    optimization: {
      moduleIds: 'hashed',
      minimizer: [
        new TerserJSPlugin({ extractComments: false }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  });
};
