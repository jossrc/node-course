const argv = require('yargs').help().argv;

console.log(argv);

let command = argv._[0];

switch (command) {
  case 'create':
    console.log('Crear una tarea pendiente');
    break;
  case 'list':
    console.log('Mostrar todas las tareas por hacer');
    break;
  case 'update':
    console.log('Actualizar una tarea por hacer');
    break;
  default:
    console.log('Command not recognized');
    break;
}
