require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth : '/api/auth',
      search: '/api/buscar',
      category: '/api/categorias',
      product: '/api/productos',
      user : '/api/usuarios',
      uploads: '/api/uploads',
    }

    // Conectar a base de datos
    this.connectionToDB();

    // Middlewares
    this.middlewares();
    // Rutas de mi aplicación
    this.routes();
  }

  async connectionToDB() {
    await dbConnection();
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
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.category, require('../routes/category'));
    this.app.use(this.paths.product, require('../routes/product'));
    this.app.use(this.paths.user, require('../routes/user'));
    this.app.use(this.paths.uploads, require('../routes/uploads.js'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando cambios en el port ${this.port}`);
    });
  }
}

module.exports = Server;
