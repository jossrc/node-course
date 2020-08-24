const express = require('express');
const app = express(); // Permite usar express como queramos

// Middleware
app.use(express.static(__dirname+'/public'));

// Por defecto muestra siempre el index.html
// En caso de tener un Home este debera estar escrito con su formato "/home.html"

// La petición se hará cuando sea de tipo GET en "/"
app.get('/', (req, res) => {
  res.send('Hello World');
}); 
// Debemos tener cuidado con este ya que se combina con el contenido publico


// La petición se hará cuando sea de tipo GET en "/data"
app.get('/data', (req, res) => {
  let output = {
    name: 'José',
    age: '21',
    url: req.url,
  };

  // Con express evitamos configurar el header
  res.send(output);
});

app.listen(3000, ()=> {
    console.log('Escuchando peticiones en el puerto 3000');
});
