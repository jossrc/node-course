const argv = require('yargs').command(
  'listar',
  'Impreme en consola la tabla de multiplicar',
  {
    base: {
      demand: true,
      alias: 'b',
    },
    limite: {
      default: 10,
      alias: 'l',
    },
  }
).help().argv;

const { createFile } = require('./multiplication/multiplication');


let argv2 = process.argv;

console.log('Process yargs  : ', argv);
// console.log('Process nativo : ', argv2);

console.log('Base   : ', argv.base);
console.log('Limite : ', argv.limite);
// let path = `tables/mult-${base}.txt`;


// createFile(base, path)
//   .then( file => console.log(`Archivo creado : ${file}`) )
//   .catch( err => console.log(`ERROR : ${err}`))
