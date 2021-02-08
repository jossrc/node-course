const { showMenu, pause } = require('./helpers/messages');

require('colors');

const main = async () => {
  console.log('Hola Mundo');

  let answer = '';

  do {
    answer = await showMenu();
    if (answer !== '0') await pause();
  } while (answer !== '0');
};

main();
