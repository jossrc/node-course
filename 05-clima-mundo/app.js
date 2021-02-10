const {
  readInput,
  inquirerMenu,
  pause,
  showFoundPlaces,
} = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
  const searches = new Searches();

  let option = 0;

  do {
    option = await inquirerMenu();
    switch (option) {
      case 1:
        const result = await readInput('Ciudad: ');
        const places = await searches.getCity(result);
        const placeId = await showFoundPlaces(places);

        if (placeId !== 0) {
          const selectedPlace = places.find((place) => place.id === placeId);

          // Mostrar resultados
          console.log('\nInformación de la ciudad\n'.green);
          console.log(`Ciudad: ${selectedPlace.name}`);
          console.log(`Lat: ${selectedPlace.lat}`);
          console.log(`Lng: ${selectedPlace.lng}`);
          console.log('Temperatura:');
          console.log('Mínima');
          console.log('Máxima');
        }
        break;
      case 2:
        console.log('Viendo el historial');
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
