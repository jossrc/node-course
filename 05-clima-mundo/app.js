const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async () => {

  const searches = new Searches();
  
  let option = 0;

  do {
    option = await inquirerMenu();
    switch (option) {
      case 1:
        // Mostrar mensaje
        const city = await readInput('Ciudad: ')
        console.log(`Buscando ciudad ${city}` );
        // Buscar los lugares

        // Seleccionar el lugar

        // Clima

        // Mostrar resultados
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperatura:');
        console.log('Mínima');
        console.log('Máxima');
        break;
      case 2:
        console.log('Viendo el historial');
        break;
    }

    if (option !== 0) await pause();

  } while (option !== 0);
}

main();
