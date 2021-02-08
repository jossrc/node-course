const Task = require("./task");

class Tasks {

  _list = {};

  /**
   * @returns {Task[]} Retorna la lista de tareas `_list` como un arreglo.
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
    const task = new Task(description)
    this._list[task.id] = task;
  }

}

module.exports = Tasks

