const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Establece la base de la tabla de multiplicar'
  })
  .option('l', {
    alias: 'list',
    type: 'boolean',
    default: false,
    describe: 'Muestra la tabla creada en consola'
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) throw 'La base tiene que ser un número';
    return true;
  }).argv;

module.exports = {
  argv
}