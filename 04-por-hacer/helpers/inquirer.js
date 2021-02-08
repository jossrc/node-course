const inquirer = require('inquirer');

require('colors');

const choices = [
  {
    value: '1',
    name: '1. Crear tarea',
  },
  {
    value: '2',
    name: '2. Listar tareas',
  },
  {
    value: '3',
    name: '3. Listar tareas completadas',
  },
  {
    value: '4',
    name: '4. Listar tareas pendientes',
  },
  {
    value: '5',
    name: '5. Completar tarea(s)',
  },
  {
    value: '6',
    name: '6. Borrar tarea',
  },
  {
    value: '0',
    name: '0. Salir',
  },
];

const questionCollection = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opción  '.green);
  console.log('=========================\n'.green);

  const { option } = await inquirer.prompt(questionCollection);

  return option;
};

const pause = async () => {
  console.log('\n');
  await inquirer.prompt([
    {
      type: 'input',
      name: 'continue',
      message: `Presione ${'ENTER'.green} para continuar...`,
    },
  ]);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
};
