const { showMenu, pause } = require('./helpers/messages');

require('colors');

const main = async () => {
  console.log('Hola Mundo');
  showMenu();
  pause();
};

main();
