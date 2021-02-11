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
          searches.addHistorial(selectedPlace.name)

          const weather = await searches.getWeatherByCoordinates(
            selectedPlace.lat,
            selectedPlace.lng
          );

          // Mostrar resultados
          console.log('\nInformación de la ciudad\n'.green);
          console.log(`Ciudad: ${selectedPlace.name}`);
          console.log(`Lat: ${selectedPlace.lat}`);
          console.log(`Lng: ${selectedPlace.lng}`);
          console.log(`Temperatura: ${weather.temp} °C`);
          console.log(`Mínima ${weather.min} °C`);
          console.log(`Máxima ${weather.max} °C`);
          console.log(`Como está el clima: ${weather.desc}`);
        }
        break;
      case 2:
        searches.historial.forEach( (place, i) => {
          const position = `${i+1}.`.green;
          console.log(`${position} ${place}`);
        })
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
