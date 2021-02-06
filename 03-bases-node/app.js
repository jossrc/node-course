const { createFile } = require('./helpers/multiply');

console.clear();
//const base = 5;

const [, , arg3 = 'base=5'] = process.argv;
const [, base = 5] = arg3.split('=');

createFile(base)
  .then((file) => console.log(file, ' creado'))
  .catch((err) => console.log(err));
