const { createFile } = require('./helpers/multiply');
const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
  })
  .option('l', {
    alias: 'list',
    type: 'boolean',
    default: false,
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) throw 'La base tiene que ser un número';
    return true;
  }).argv;

console.clear();

console.log(argv);

console.log('Base : yargs', argv.base);
console.log('Listar : yargs', argv.list);

//const base = 5;

// const [, , arg3 = 'base=5'] = process.argv;
// const [, base = 5] = arg3.split('=');

createFile(argv.base, argv.list)
  .then((file) => console.log(file, ' creado'))
  .catch((err) => console.log(err));
