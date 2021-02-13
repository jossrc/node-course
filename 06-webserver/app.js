const express = require('express');
const hbs = require('hbs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Handlebar
app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`, (err) => {
  if (err) console.log(err);
});

// Servir contenido estático
app.use(express.static('public'));

const hbsOptions = {
  name: 'Jose Robles',
  title: 'Curso de Node',
};

// Rutas del proyecto
app.get('/', (req, res) => {
  res.render('home', hbsOptions);
});

app.get('/generic', (req, res) => {
  res.render('generic', hbsOptions);
});

app.get('/elements', (req, res) => {
  res.render('elements', hbsOptions);
});

app.get('*', (req, res) => {
  res.send('404 | Page not found')
});

// Escuchando los cambios
app.listen(PORT, () => {
  console.log(`Corriendo en el puerto ${PORT}`);
});
