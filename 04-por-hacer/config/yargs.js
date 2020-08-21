const description = {
  description: {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea pendiente',
  },
};

const completed = {
  completed: {
    alias: 'c',
    type: 'boolean',
    default: true,
    desc: 'Indica si la tarea está completada o no',
  },
};

const all = {
  all: {
    alias: 'a',
    default: 'not',
    desc: 'Permite obtener todas las tareas (yes/not)',
  },
};

const argv = require('yargs')
  .command('create', 'Crea una tarea pendiente', description)
  .command('update', 'Actualiza una tarea por hacer', {
    ...description,
    ...completed,
  })
  .command('delete', 'Elimina una tarea pendiente', description)
  .command('list', 'Visualizar todas las tareas', { ...completed, ...all })
  .help().argv;

module.exports = {
  argv,
};
