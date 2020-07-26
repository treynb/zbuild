const { merge } = require('webpack-merge');
const devConfigFn = require('./webpack.dev');

module.exports = () => {
  return merge(devConfigFn(), {

  });
};
