require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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


const uri = `mongodb+srv://${username}:${password}@cluster0.lldbo.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(uri, (err, res) => {
  if (err) {
    throw err;
  }

  console.log('Conexión a la base de datos exitosa');

});



app.listen(process.env.PORT, () => {
  console.log(`Conectado en el Port ${process.env.PORT}`);
});
