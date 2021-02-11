const http = require('http');

PORT = 4200

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write(`<h1>Hello World | 404 Page not found</h1>`);
  response.end();
}).listen(PORT);

console.log(`Escuchando en el puerto`, PORT);
