const express = require('express');
const app = express(); // Permite usar express como queramos

// La petición se hará cuando sea de tipo GET en "/"
app.get('/', (req, res) => {
  res.send('Hello World');
});

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
