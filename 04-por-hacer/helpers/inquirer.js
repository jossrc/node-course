const inquirer = require('inquirer');
const Task = require('../models/task');

require('colors');

const choices = [
  {
    value: '1',
    name: `${'1.'.green} Crear tarea`,
  },
  {
    value: '2',
    name: `${'2.'.green} Listar tareas`,
  },
  {
    value: '3',
    name: `${'3.'.green} Listar tareas completadas`,
  },
  {
    value: '4',
    name: `${'4.'.green} Listar tareas pendientes`,
  },
  {
    value: '5',
    name: `${'5.'.green} Completar tarea(s)`,
  },
  {
    value: '6',
    name: `${'6.'.green} Borrar tarea`,
  },
  {
    value: '0',
    name: `${'0.'.green} Salir`,
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

/**
 * Genera y muestra un menú de opciones para manipular
 * las tareas. La opción seleccionada contiene un valor que
 * lo identifica, este será retornado como una Promesa.
 */
const inquirerMenu = async () => {
  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opción  '.white);
  console.log('=========================\n'.green);

  const { option } = await inquirer.prompt(questionCollection);

  return option;
};

/**
 * Pausa momentaneamente la terminal e imprime un mensaje
 * de confirmación. Este desaparece al presionar la
 * tecla Enter.
 */
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

/**
 * Imprime en pantalla el texto deseado. La respuesta es de
 * caracter obligatorio, esta será leída y se retornará
 * como una Promesa.
 * @param {string} message Mensaje a imprimir.
 * @return {Promise<string>} Respuesta al mensaje impreso.
 */
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

/**
 * Imprime en pantalla el mensaje de confirmación.
 * La respuesta es un booleano como Promesa.
 * @param {string} message Mensaje de confirmación
 * @returns {Promise<boolean>} Respuesta obtenida
 */
const confirmAction = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

/**
 * Muestra la lista completa de tareas que se desean borrar.
 * La opción seleccionada retorna el ID de la tarea como
 * una Promesa.
 * @param {Task[]} tasks Arreglo de tareas
 * @returns {Promise<string>} Id de la tarea seleccionada
 */
const showTodoListToDelete = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const position = `${(i + 1).toString()}.`.green;
    return {
      value: task.id,
      name: `${position} ${task.description}`,
    };
  });

  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`,
  });

  const question = [
    {
      type: 'list',
      name: 'taskId',
      message: 'Borrar',
      choices,
    },
  ];

  const { taskId } = await inquirer.prompt(question);
  return taskId;
};

/**
 * Muestra una lista de checkboxes de todas las tareas completadas y pendientes.
 * Al presionar la tecla Enter retorna un arreglo de identificadores de las tareas
 * pero como una Promesa.
 * @param {Task[]} tasks Arreglo de tareas
 * @returns {Promise<string[]>} Arreglo de ids de las tareas
 */
const showTodoCheckList = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const position = `${(i + 1).toString()}.`.green;
    return {
      value: task.id,
      name: `${position} ${task.description}`,
      checked: task.finishedDate ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'taskIds',
      message: 'Seleccione',
      choices,
    },
  ];

  const { taskIds } = await inquirer.prompt(question);
  return taskIds;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  showTodoListToDelete,
  confirmAction,
  showTodoCheckList,
};
