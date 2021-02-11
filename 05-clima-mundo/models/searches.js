const fs = require('fs');

const { default: axios } = require('axios');

require('dotenv').config();

class Searches {
  historial = ['Lima', 'Madrid', 'Bogota'];
  PATH = './db/database.json';

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  get capitalizedHistorial() {
    const capitalized = this.historial.map((txt) => {
      let words = txt.split(' ');
      words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
      return words.join(' ');
    });

    return capitalized;
  }

  constructor() {
    this.loadDB();
    this.historial = this.capitalizedHistorial;
  }

  async getCity(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const response = await instance.get();
      const basicInformation = response.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));

      return basicInformation;
    } catch (error) {
      console.log('Hubo un error' + error);
      return [];
    }
  }

  async getWeatherByCoordinates(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { lat, lon, ...this.paramsOpenWeather },
      });

      const response = await instance.get();

      const {
        weather: [{ description }],
        main: { temp, temp_min, temp_max },
      } = response.data;

      return {
        desc: description,
        min: temp_min,
        max: temp_max,
        temp,
      };
    } catch (error) {
      console.log(`Sucedió un error: ${error}`);
    }
  }

  saveDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.PATH, JSON.stringify(payload));
  }

  loadDB() {
    if (!fs.existsSync(this.PATH)) {
      return null;
    }

    const info = fs.readFileSync(this.PATH, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    this.historial = data.historial;
  }

  addHistorial(place = '') {
    if (this.historial.includes(place.toLocaleLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0,5)

    this.historial.unshift(place.toLocaleLowerCase());

    this.saveDB();
  }
}

module.exports = Searches;
