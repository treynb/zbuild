const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = () => {
  return merge(commonConfig, {
    optimization: {
      moduleIds: 'named',
    },
    devServer: {
      port: 8080,
      host: 'localhost',
      disableHostCheck: true,
    },
  });
};
