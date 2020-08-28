require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Para procesar peticiones x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Para procesar peticiones json
app.use(bodyParser.json());

app.get('/user', (req, res) => {
  res.json('getUser');
});

app.post('/user/:id', (req, res) => {
  let body = req.body;

  if (body.name === undefined) {
    res.status(400).json({
      ok: false,
      message: 'El nombre es necesario',
    });
  } else {
    res.json({ body });
  }
});

app.put('/user', (req, res) => {
  res.json('putUser');
});

app.delete('/user', (req, res) => {
  res.json('deleteUser');
});

app.listen(process.env.PORT, () => {
  console.log(`Conectado en el Port ${process.env.PORT}`);
});
