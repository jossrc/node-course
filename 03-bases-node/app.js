const argv = require('yargs')
  .command('list', 'Imprime en consola la tabla de multiplicar', {
    base: {
      demand: true,
      default: 1,
      alias: 'b',
      describe: 'Indica la base del número a multiplicar',
    },
    limit: {
      default: 10,
      alias: 'l',
      describe: 'Indica el límite de la tabla',
    },
  })
  .command('create', 'Crea un archivo .txt con la tabla de multiplicar', {
    base: {
      demand: true,
      alias: 'b',
      describe: 'Indica la base del número a multiplicar',
    },
    limit: {
      default: 10,
      alias: 'l',
      describe: 'Indica el límite de la tabla',
    }
  })
  .help().argv;

const { createFile, listTable } = require('./multiplication/multiplication');

let command = argv._[0]; // Devuelve el comando escrito en consola
let base = argv.base; // Obtenemos el flag "base" del comando
let limit = argv.limit; // Obtenemos el flag "limit" del comando
let path = `tables/mult-${base}.txt`;

switch (command) {
  case 'list':
    listTable(base, limit);
    break;
  case 'create':
    createFile(base, limit, path)
      .then((file) => console.log(`Archivo creado : ${file}`))
      .catch((err) => console.log(`ERROR : ${err}`));
    break;
  default:
    console.log('Command not recognized');
    break;
}
