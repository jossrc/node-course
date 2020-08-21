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

const printTodoList = () => {
  loadDB();
  console.log('======== Por Hacer ========'.green);
  for (const task of todoList) {
    console.log('Tarea  : ', task.description);
    console.log('Estado : ', task.isCompleted);
    console.log('==========================='.green);
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

module.exports = {
  create,
  printTodoList,
  getTodoList,
  update
};
