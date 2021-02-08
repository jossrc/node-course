const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const { saveDB, loadDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

require('colors');

const main = async () => {
  let answer = '';
  const tasks = new Tasks();

  const tasksDB = loadDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    answer = await inquirerMenu();

    switch (answer) {
      case '1':
        const descriptionTask = await readInput('Descripción: ');
        tasks.addNewTask(descriptionTask);
        break;
      case '2':
        console.log(tasks.listToArray);
        break;
    }

    saveDB(tasks.listToArray)

    await pause();
  } while (answer !== '0');
};

main();
