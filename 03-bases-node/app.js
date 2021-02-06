const { createFile } = require('./helpers/multiply');
const { argv } = require('./config/yargs');

require('colors');

console.clear();

createFile(argv.base, argv.limit, argv.print)
  .then((file) => console.log(file.rainbow, ' creado'))
  .catch((err) => console.log(err));
