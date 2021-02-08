const { inquirerMenu, pause } = require('./helpers/inquirer');
const Task = require('./models/task');
const Tasks = require('./models/tasks');

require('colors');

const main = async () => {

  let answer = '';

  do {
    // answer = await inquirerMenu();

    const tasks = new Tasks();
    const task = new Task('Comprar comida');

    tasks._list[task.id] = task

    console.log(tasks);

    await pause()
  } while (answer !== '0');
};

main();
