const path = require('path');
const cwd = process.cwd();

module.exports = {
  cwd,
  build: path.resolve(cwd, './build'),
  src: path.resolve(cwd, './src'),
  entry: path.resolve(cwd, './src/index'),
  template: path.resolve(__dirname, '../webpack/index.html')
}
