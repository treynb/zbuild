const path = require('path');
const paths = require('../utils/paths');
const program = require('commander');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const rimraf = require('rimraf');
const { merge } = require('webpack-merge');

const devConfigFn = require('./webpack.dev');
const mockConfigFn = require('./webpack.mock');
const prodConfigFn = require('./webpack.prod');

program
  .command('dev')
  .option('-c,--config <config>', 'custom webpack config')
  .action(function ({ config }) {
    runDev(devConfigFn(), getCustomConfig(config, 'development'));
  });

program
  .command('dev2')
  .option('-c,--config <config>', 'custom webpack config')
  .action(function ({ config }) {
    runBuild(devConfigFn(), getCustomConfig(config, 'development'));
  });

program
  .command('mock')
  .option('-c,--config <config>', 'custom webpack config')
  .action(function ({ config }) {
    runDev(mockConfigFn(), getCustomConfig(config, 'mock'));
  });

program
  .command('prod')
  .option('-c,--config <config>', 'custom webpack config')
  .action(function ({ config }) {
    runBuild(prodConfigFn(), getCustomConfig(config, 'production'));
  });

function runDev(config, customConfig) {
  const finalConfig = merge(config, customConfig);
  const compiler = webpack(finalConfig);
  const { host, port, ...options } = finalConfig.devServer;
  const server = new WebpackDevServer(compiler, options);
  server.listen(port, host, () => {
    console.log(`Starting server on ${options.https ? "https" : "http"}://${host}:${port}`);
  });
}

function runBuild(config, customConfig) {
  rimraf.sync(paths.build);
  webpack(merge(config, customConfig), (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors.toString());
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings.toString());
    }
  });
}

function getCustomConfig(configPath, env) {
  if (!configPath) return {};
  return require(path.resolve(paths.cwd, configPath))(env);
}
