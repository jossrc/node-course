const { argv } = require('./config/yargs');
const colors = require('colors');
const { createFile, listTable } = require('./multiplication/multiplication');

let command = argv._[0];
let base = argv.base;
let limit = argv.limit;
let path = `tables/mult-${base}.txt`;

switch (command) {
  case 'list':
    listTable(base, limit);
    break;
  case 'create':
    createFile(base, limit, path)
      .then((file) => console.log('Archivo creado : ' + `${file}`.blue))
      .catch((err) => console.log(`ERROR : ${err}`.red));
    break;
  default:
    console.log('Command not recognized'.cyan);
    break;
}
