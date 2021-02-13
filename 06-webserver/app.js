const express = require('express');
const app = express();

const PORT = 8080;

app.set('view engine', 'hbs');

// Servir contenido estático
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', {
    name: 'Jose Robles',
    title: 'Curso de Node'
  });
});

app.get('/generic', (req, res) => {
  res.sendFile(`${__dirname}/public/generic.html`);
});

app.get('/elements', (req, res) => {
  res.sendFile(`${__dirname}/public/elements.html`);
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/404.html`);
});

app.listen(PORT, () => {
  console.log(`Corriendo en el puerto ${PORT}`);
});
