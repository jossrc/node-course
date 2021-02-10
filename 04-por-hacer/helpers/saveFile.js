const fs = require('fs');
const Task = require('../models/task');

const PATH = './db/data.json';

/**
 * Guarda un arreglo de datos en un archivo JSON
 * @param {Task[]} data Arreglo de tareas
 */
const saveDB = (data) => {
  fs.writeFileSync(PATH, JSON.stringify(data));
};

/**
 * Carga y lee la información obtenida de un archivo JSON.
 * En caso de existir información, retornará un arreglo de tareas 
 * contenidas en la data, en caso contrario se retornará `null`.
 * @returns {Task[] | null} Arreglo de tareas.
 */
const loadDB = () => {
  if (!fs.existsSync(PATH)) {
    return null;
  }

  const info = fs.readFileSync(PATH, { encoding: 'utf-8' });
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  saveDB,
  loadDB,
};
