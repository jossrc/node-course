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
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World API');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando cambios en el port ${this.port}`)
        });
    }
}

module.exports = Server;
