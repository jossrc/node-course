const {createFile: createMultiplicationFile} = require('./multiplication/multiplication');

let base = 5;
let path = `tables/mult-${base}.txt`;

createMultiplicationFile(base, path)
  .then( file => console.log(`Archivo creado : ${file}`) )
  .catch( err => console.log(`ERROR : ${err}`))
