import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';

import db from '../db/connection';

class Server {
  private app: Application;
  private port: string | number;
  private apiPaths = {
    users: '/api/usuarios',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    // Conectar a la BD
    this.dbConnection();

    // Definir Middlewares
    this.middlewares();

    // Definir mis rutas
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());

    // Carpeta pública
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;
