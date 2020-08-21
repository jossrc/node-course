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
    todo.printTodoList(argv.all, argv.completed);
    break;
  case 'update':
    let updated = todo.update(argv.description, argv.completed);
    console.log(updated);
    break;
  case 'delete':
    let isDeleted = todo.remove(argv.description);
    console.log(isDeleted);
    break;
  default:
    console.log('Command not recognized');
    break;
}
