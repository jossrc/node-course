const options = {
  base: {
    demand: true,
    alias: 'b',
    describe: 'Indica la base del número a multiplicar',
  },
  limit: {
    default: 10,
    alias: 'l',
    describe: 'Indica el límite de la tabla',
  },
};

const argv = require('yargs')
  .command('list', 'Imprime en consola la tabla de multiplicar', options)
  .command(
    'create',
    'Crea un archivo .txt con la tabla de multiplicar',
    options
  )
  .help().argv;

module.exports = {
    argv
}