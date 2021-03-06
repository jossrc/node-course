const Task = require('./task');
const inquirer = require('inquirer');

class Tasks {
  /**
   * Lista de tareas. Objeto que contiene Tareas mediante su uuid.
   * Su estructura es parecido a como se trabaja
   * con MongoDB o Firebase: `{uuid: Task}`
   */
  _list = {};

  /**
   * @returns {Task[]} Retorna la lista de tareas `_list` como un arreglo de sus valores.
   */
  get listToArray() {
    return Object.values(this._list);
  }

  constructor() {
    this._list = {};
  }

  /**
   * Crea una nueva tarea usando la descripción obtenida. Este
   * será agregado a la lista de tareas `_list`
   * @param {string} description Descripción de la tarea.
   */
  addNewTask(description = '') {
    const task = new Task(description);
    this._list[task.id] = task;
  }

  /**
   * Carga un arreglo de Tareas y los transforma de tal modo que
   * sean utilizables en la propiedad `_list`
   * @param {Task[]} tasks
   */
  loadTasksFromArray(tasks) {
    tasks.forEach((task) => (this._list[task.id] = task));
  }

  /**
   * Muestra todas las tareas junto con su estado: Completada o
   * Pendiente. Esta función usa el `inquirer.prompt()`
   * para interactuar con las tareas obtenidas.
   */
  async showFullList() {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'fullList',
        message: 'Lista completa de tareas',
        choices: this.listToArray.map((task, index) => {
          const position = `${(index + 1).toString()}.`;
          const [positionColor, state] = task.finishedDate
            ? [position.green, 'Completada'.green]
            : [position.red, 'Pendiente'.red];
          return `${positionColor} ${task.description} :: ${state}`;
        }),
      },
    ]);
  }

  /**
   * Muestra la lista completa de tareas según su estado.
   * @param {boolean} completed Estado de la tarea: Completado `true` Pendiente `false`
   */
  showListByState(completed = true) {
    this.listToArray
      .filter((task) => (completed ? task.finishedDate : !task.finishedDate))
      .forEach((task, index) => {
        const position = `${(index + 1).toString()}.`;
        const [positionColor, state] = task.finishedDate
          ? [position.green, task.finishedDate.green]
          : [position.red, 'Pendiente'.red];
        console.log(`${positionColor} ${task.description} :: ${state}`);
      });
  }

  /**
   * Elimina una tarea mediante su ID único.
   * @param {string} id Identificador de una tarea
   */
  deleteOneByID(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  /**
   * Permite alternar el estado de una tarea, es decir,
   * de completado a pendiente. Al estar completado la propiedad
   * `finishedDate` de una tarea será la fecha de finalización. En caso
   * de ser pendiente será `null`
   * @param {string[]} ids Identificador de una tarea
   */
  toggleCompleted(ids) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.finishedDate) {
        task.finishedDate = new Date().toISOString();
      }
    });

    this.listToArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].finishedDate = null;
      }
    });
  }
}

module.exports = Tasks;
