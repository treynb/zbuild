const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../utils/paths');

module.exports = {
  entry: {
    index: paths.entry,
  },
  output: {
    path: paths.build,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.js', '.ts'],
    alias: {
      '@': paths.src,
    },
  },
  mode: 'development',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3,
                  },
                },
              ],
              '@babel/preset-react',
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  allExtensions: true,
                }
              ]
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-optional-chaining',
            ],
          }
        },
      },
      getLessOptions(true),
      getLessOptions(false),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: paths.template }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  optimization: {
    moduleIds: 'named',
    namedChunks: true,
  },
};

function getLessOptions(cssModule) {
  return {
    test: cssModule ? /\.module\.less$/ : /\.less$/,
    exclude: cssModule ? /node_modules/ : /\.module.less$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          modules: cssModule && {
            localIdentName: '[local]-[hash:base64:5]',
          },
          localsConvention: 'camelCaseOnly',
        },
      },
      {
        loader: 'less-loader',
      }
    ],
  };
}
