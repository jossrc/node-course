const axios = require('axios');

const API_KEY = '96533fda95429ba5085ae82e1e0ea12a';
const url = 'api.openweathermap.org/data/2.5/weather';

const getWeather = async (lat, lng) => {
  const api = `${url}?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

  const resp = await axios.get(api);

  return resp.data.main.temp;
};

module.exports = {
  getWeather,
};
