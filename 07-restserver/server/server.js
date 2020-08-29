require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Para procesar peticiones x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Para procesar peticiones json
app.use(bodyParser.json());

// Utilizando la ruta user
app.use(require('./routes/user'));


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
