require('colors');

/**
 * Habilita la entrada, lectura y salida de texto desde la consola.
 * Se acepta una pregunta que será resuelta, en consecuencia, se retornará
 * la respuesta obtenida como Promesa.
 * @param {string} text Mensaje inicial a mostrar en consola.
 * @param {(option: string) => void} callback Función que permite trabajar con la opción seleccionada.
 * @return {Promise<string>} Respuesta establecida a la pregunta.
 */
const enableReadline = (text, callback = null) => {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(text, (option) => {
      if (callback) callback(option);
      readline.close();
      resolve(option);
    });
  });
};

/**
 * Muestra el menu de opciones que se pueden realizar
 * en la aplicación de Tareas por Hacer. Adicionalmente permite
 * seleccionar una de ellas y retorna la opción elegida.
 */
const showMenu = async () => {
  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opción  '.green);
  console.log('=========================\n'.green);

  console.log(`${'1.'.green} Crear tarea`);
  console.log(`${'2.'.green} Listar tareas`);
  console.log(`${'3.'.green} Listar tareas completadas`);
  console.log(`${'4.'.green} Listar tareas pendientess`);
  console.log(`${'5.'.green} Completar tarea(s)`);
  console.log(`${'6.'.green} Borrar tarea`);
  console.log(`${'0.'.green} Salir\n`);

  return enableReadline('Seleccione una opción: ');
};

/**
 * Muestra en pantalla un mensaje y pausa las tareas
 * hasta que se precione la tecla ENTER.
 */
const pause = async () =>
  enableReadline(`\nPresione ${'ENTER'.green} para continuar... \n`);

module.exports = {
  showMenu,
  pause,
};
