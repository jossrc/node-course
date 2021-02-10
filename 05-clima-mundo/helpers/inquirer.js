const inquirer = require('inquirer');

require('colors');

const choices = [
  {
    value: 1,
    name: `${'1.'.green} Buscar ciudad`,
  },
  {
    value: 2,
    name: `${'2.'.green} Historial`,
  },
  {
    value: 0,
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
 * @returns {Promise<number>} Opción elegida (número)
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


module.exports = {
  inquirerMenu,
  pause,
  readInput,
  confirmAction,
};