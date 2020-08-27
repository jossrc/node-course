const express = require('express');
const app = express();

const hbs = require('hbs');
require('./hbs/helpers');

app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home', {
    name: 'José Robles',
    year: new Date().getFullYear(),
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'José Robles',
  });
});

app.listen(3000, () => {
  console.log('Escuchando peticiones en el puerto 3000');
});
