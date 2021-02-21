require('dotenv').config();
const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    this.routes();
  }

  middlewares() {
    // Directorio Público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        message: 'GET API',
      });
    });

    this.app.put('/api', (req, res) => {
      res.status(400).json({
        message: 'PUT API',
      });
    });

    this.app.post('/api', (req, res) => {
      res.status(201).json({
        message: 'POST API',
      });
    });

    this.app.patch('/api', (req, res) => {
      res.json({
        message: 'PATCH API',
      });
    });

    this.app.delete('/api', (req, res) => {
      res.json({
        message: 'DELETE API',
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando cambios en el port ${this.port}`);
    });
  }
}

module.exports = Server;
