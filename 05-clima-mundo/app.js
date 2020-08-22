const place = require('./place/place');
const openW = require('./weather/weather');

// Permite crear flags sin necesidad de comandos solo con node app
const argv = require('yargs').options({
  address: {
    alias: 'a',
    desc: 'Dirección de la ciudad para obtener el clima',
    demand: true,
  },
}).argv;

place.getLatLng(argv.address).then(console.log);

openW.getWeather(45.421106, -75.690308).then(console.log).catch(console.log);

const getInfo = async (address) => {
  try {
    const { formatted, lat, lng } = await place.getLatLng(address);

    const temperature = await openW.getWeather(lat, lng);

    return `El clima de ${formatted} es de ${temperature} °C`;
  } catch (e) {
    return `No se pudo determinar el clima de ${address}`;
  }
};

getInfo(argv.address)
  .then(console.log)
  .catch(console.log);
