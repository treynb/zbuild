const program = require('commander');
const shelljs = require('shelljs');

program
  .command('type-check')
  .action(function () {
    shelljs.exec('tsc');
  });
