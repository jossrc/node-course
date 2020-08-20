const { argv } = require('./config/yargs');
const todo = require('./por-hacer/por-hacer');

console.log(argv);

let command = argv._[0];

switch (command) {
  case 'create':
    let task = todo.create(argv.description);
    console.log(task);
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
