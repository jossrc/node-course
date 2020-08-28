const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json('Bienvenido'); // Para enviar Json en ves de texto
});

app.listen(3000, ()=> {
    console.log(`Conectado en el Port 3000`);
})