const {
  inquirerMenu,
  pause,
  readInput,
  showTodoListToDelete,
  confirmAction,
  showTodoCheckList,
} = require('./helpers/inquirer');
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
        await tasks.showFullList();
      case '3':
        tasks.showListByState(true);
        break;
      case '4':
        tasks.showListByState(false);
        break;
      case '5':
        const ids = await showTodoCheckList( tasks.listToArray );
        console.log(ids);
        break;
      case '6':
        const id = await showTodoListToDelete(tasks.listToArray);

        if (id !== '0') {
          const ok = await confirmAction('¿Estás seguro?');
          if (ok) {
            tasks.deleteOneByID(id);
            console.log('Tarea Borrada');
          }
        }
    }

    saveDB(tasks.listToArray);

    await pause();
  } while (answer !== '0');
};

main();
