const express = require('express')
const app = express()

const PORT = 8080

app.get('/', (req, res) => {
  res.send('<h2>Home</h2>')
})

app.get('/about', (req, res) => {
  res.send(`<h2>Sobre mi</h2>`)
})

app.get('*', (req, res)=> {
  res.send(`<h2>404 | Page not found</h2>`)
});

app.listen(PORT, ()=> {
  console.log(`Corriendo en el puerto ${PORT}`);
});
