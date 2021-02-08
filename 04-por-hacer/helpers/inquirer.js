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

/**
 * Genera y muestra un menú de opciones para manipular
 * las tareas. La opción seleccionada contiene un valor que
 * lo identifica, este será retornado como una Promesa.
 */
const inquirerMenu = async () => {
  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opción  '.green);
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
 * caracter obligatorio, este será leída y se retornará
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

module.exports = {
  inquirerMenu,
  pause,
  readInput,
};
