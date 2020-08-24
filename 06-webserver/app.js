const http = require('http');

http
  .createServer((req, res) => {
      // Indica el tipo de datos que se obtendran cuando se hace la petición
    res.writeHead(200, { 'Content-Type': 'application/json' });

    let output = {
        name: 'José',
        age: '21',
        url: req.url
    }

    // res.write(`<h1>Hello World</h1>`); // No funciona por el Content Type
    res.write(JSON.stringify(output));
    res.end();
  })
  .listen(8080);

console.log('Escuchando en el puerto 8080');
