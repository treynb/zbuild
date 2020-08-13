#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');

require('./src/webpack');

program
  .version(pkg.version)
  .description(pkg.description)
  .parse(process.argv);
