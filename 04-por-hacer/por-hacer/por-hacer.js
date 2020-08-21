const fs = require('fs');
const colors = require('colors');

let todoList = [];

const saveDB = () => {
  let data = JSON.stringify(todoList);

  fs.writeFile('db/data.json', data, (err) => {
    if (err) throw new Error('Ooops algo salió mal', err);
  });
};

const loadDB = () => {
  try {
    todoList = require('../db/data.json');
  } catch (error) {
    todoList = [];
  }
};

const create = (description) => {
  loadDB();

  let todo = {
    description,
    isCompleted: false,
  };

  todoList.push(todo);

  saveDB();

  return todo;
};

const forList = (todoList) => {
  for (const task of todoList) {
    console.log('Tarea  : ', task.description);
    console.log('Estado : ', task.isCompleted);
    console.log('==========================='.green);
  }
};

const printTodoList = (all, completed = true) => {
  loadDB();

  if (all === 'yes') {
    console.log('======== Tareas ========'.green);
    forList(todoList);
    return;
  }

  if (completed) {
    let completedTasks = todoList.filter(
      (task) => task.isCompleted == completed
    );
    console.log('======== Tareas Completadas ========'.green);
    forList(completedTasks);
  } else {
    let incompleteTasks = todoList.filter(
      (task) => task.isCompleted == completed
    );
    console.log('======== Tareas Incompletas ========'.green);
    forList(incompleteTasks);
  }
};

const getTodoList = () => {
  loadDB();
  return todoList;
};

const update = (description, completed = true) => {
  loadDB();

  let index = todoList.findIndex((task) => task.description === description);

  if (index >= 0) {
    todoList[index].isCompleted = completed;
    saveDB();
    return true;
  }

  return false;
};

const remove = (description) => {
  loadDB();

  let newList = todoList.filter((task) => task.description !== description);

  if (newList.length !== todoList.length) {
    todoList = newList;
    saveDB();
    return true;
  }

  return false;
};

module.exports = {
  create,
  printTodoList,
  getTodoList,
  update,
  remove,
};
