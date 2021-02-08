const inquirer = require('inquirer');
require('colors');

const questionCollection = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      '1. Crear tarea',
      '2. Listar tareas',
      '3. Listar tareas completadas',
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opción  '.green);
  console.log('=========================\n'.green);

  const options = await inquirer.prompt(questionCollection);

  return options;
};

module.exports = {
  inquirerMenu,
};
