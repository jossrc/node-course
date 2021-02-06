const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Base de la tabla de multiplicar',
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Límite de la tabla de multiplicar',
  })
  .option('p', {
    alias: 'print',
    type: 'boolean',
    default: false,
    describe: 'Imprime la tabla creada en consola',
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) throw 'La base tiene que ser un número';
    if (isNaN(argv.l)) throw 'El límite tiene que ser un número';
    return true;
  }).argv;

module.exports = {
  argv,
};
