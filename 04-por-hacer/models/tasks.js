const Task = require("./task");

class Tasks {

  _list = {};

  constructor() {
    this._list = {};
  }

  addNewTask(description = '') {
    const task = new Task(description)
    this._list[task.id] = task;
  }

}

module.exports = Tasks

