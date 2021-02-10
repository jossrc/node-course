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

  async getCity(place = '') {}
}

module.exports = Searches;
