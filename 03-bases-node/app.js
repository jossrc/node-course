const {createFile} = require('./multiplication/multiplication');

// proccess -> Pertenece a Node
// console.log(process);

// proccess.argv -> Obtiene las variables que se pasan por la terminal
// console.log(process.argv);

let argv = process.argv;
let parameters = argv[2];
let base = parameters.split('=')[1];

let path = `tables/mult-${base}.txt`;

// Trabajar con parámetros por la terminal es un dolor de cabeza 
// Por lo que se recomienda usar "yargs"

createFile(base, path)
  .then( file => console.log(`Archivo creado : ${file}`) )
  .catch( err => console.log(`ERROR : ${err}`))
