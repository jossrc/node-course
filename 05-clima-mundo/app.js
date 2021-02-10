const { readInput, inquirerMenu, pause } = require("./helpers/inquirer")

const main = async () => {
  
  let option = 0;

  do {
    option = await inquirerMenu();
    switch (option) {
      case 1:
        console.log('Buscando ciudad');       
        break;
      case 2:
        console.log('Viendo el historial');
        break;
    }

    if (option !== 0) await pause();

  } while (option !== 0);
}

main();
