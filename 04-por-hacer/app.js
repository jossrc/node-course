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
    todo.printTodoList();
    break;
  case 'update':
    let updated = todo.update(argv.description, argv.completed);
    console.log(updated);
    break;
  default:
    console.log('Command not recognized');
    break;
}
