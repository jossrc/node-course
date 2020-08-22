const axios = require('axios');

const API_KEY = 'ca3b393ef2604cbfad3a10cd43bc48da';
const url = 'https://api.opencagedata.com/geocode/v1/json';

const getPlaceInfo = async (place) => {
  const placename = encodeURI(place);
  const apiURL = `${url}?q=${placename}&key=${API_KEY}`;

  const instance = axios.create({
    baseURL: apiURL,
  });

  const resp = await instance.get();
  const { results } = resp.data;

  if (results.length === 0) {
    throw new Error(`No hay resultado para ${place}`);
  }

  return results;
};

const getLatLng = async (place) => {
  const results = await getPlaceInfo(place);

  const {
    formatted,
    geometry: { lat, lng },
  } = results[0];

  return { formatted, lat, lng };
};

module.exports = {
  getLatLng,
};

//components: { city, country, state },
