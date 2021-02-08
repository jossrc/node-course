const Task = require('./task');

class Tasks {
  /**
   * Lista de tareas. Objeto que contiene Tareas mediante su uuid.
   * Su estructura es parecido a como se trabaja
   * con MongoDB o Firebase: `{uuid: Task}`
   */
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
}

module.exports = Tasks;
