require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Permite armar una ruta

const app = express();

// Para procesar peticiones x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Para procesar peticiones json
app.use(bodyParser.json());

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuración global de rutas
app.use(require('./routes/index'));

mongoose.set('useCreateIndex', true);

mongoose.connect(
  process.env.URLDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    }

    console.log('Conexión a la base de datos exitosa');
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Conectado en el Port ${process.env.PORT}`);
});
