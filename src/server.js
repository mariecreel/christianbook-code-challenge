const http = require('http');
const products = require('./products.json')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(products));
});

server.listen(port, hostname, () =>{
  console.log(`Server running at http://${hostname}:${port}/`)
})
