const { createFile } = require('./helpers/multiply');

console.clear();
const base = 5;

createFile(base)
  .then( file =>  console.log(file, ' creado'))
  .catch(err => console.log(err));
