const fs = require('fs');

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

module.exports = {
  create,
};
