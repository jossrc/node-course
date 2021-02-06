const { createFile } = require('./helpers/multiply');
const { argv } = require('./config/yargs');

console.clear();

createFile(argv.base, argv.list)
  .then((file) => console.log(file, ' creado'))
  .catch((err) => console.log(err));
