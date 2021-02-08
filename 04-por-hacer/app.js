const { inquirerMenu, pause } = require('./helpers/inquirer');

require('colors');

const main = async () => {
  console.log('Hola Mundo');

  let answer = '';

  do {
    answer = await inquirerMenu();

    await pause()
  } while (answer !== '0');
};

main();
