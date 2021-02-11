const { default: axios } = require('axios');

require('dotenv').config();

class Searches {
  historial = ['Lima', 'Madrid', 'Bogota'];

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

  constructor() {
    // TODO: Leer DB si existe
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
}

module.exports = Searches;
