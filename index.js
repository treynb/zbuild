#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');

require('./src/webpack');
require('./src/eslint');
require('./src/type-check');

program
  .version(pkg.version)
  .description(pkg.description)
  .parse(process.argv);
