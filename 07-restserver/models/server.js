require('dotenv').config();

const cors = require('cors');
const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/usuarios';

    // Middlewares
    this.middlewares();

    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando cambios en el port ${this.port}`);
    });
  }
}

module.exports = Server;
