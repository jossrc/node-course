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
    default: true,
    desc: 'Indica si la tarea está completada o no',
  },
};

const argv = require('yargs')
  .command('create', 'Crea una tarea pendiente', description)
  .command('update', 'Actualiza una tarea por hacer', {
    ...description,
    ...completed,
  })
  .help().argv;

module.exports = {
    argv
}
