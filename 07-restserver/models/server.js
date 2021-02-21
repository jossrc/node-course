require('dotenv').config();
const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.routes();
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando cambios en el port ${this.port}`)
        });

    }
}

module.exports = Server;
