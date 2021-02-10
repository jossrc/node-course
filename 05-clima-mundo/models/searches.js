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

  constructor() {
    // TODO: Leer DB si existe
  }

  async getCity(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      console.log(instance);
      return []
    } catch (error) {
      console.log('Hubo un error' + error);
      return [];
    }
  }
}

module.exports = Searches;
