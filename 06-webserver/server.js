const express = require('express');
const app = express(); // Permite usar express como queramos

// Middleware
// Al estar en publico todos podran tener acceso a su contenido
app.use(express.static(__dirname+'/public'));

// Express HBS engine
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(3000, ()=> {
    console.log('Escuchando peticiones en el puerto 3000');
});
