const place = require('./place/place');

// Permite crear flags sin necesidad de comandos solo con node app
const argv = require('yargs').options({
  address: {
    alias: 'a',
    desc: 'Dirección de la ciudad para obtener el clima',
    demand: true,
  },
}).argv;

place.getLatLng(argv.address).then(console.log);
