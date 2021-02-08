const { inquirerMenu } = require('./helpers/inquirer');

require('colors');

const main = async () => {
  console.log('Hola Mundo');

  let answer = '';

  do {
    answer = await inquirerMenu();
    console.log({answer});

  } while (answer !== '0');
};

main();
