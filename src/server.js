const http = require('http');
const products = require('./products.json');
const fs = require('fs').promises;
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {

  fs.readFile(__dirname + '/index.html')
    .then(contents => {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(contents);
    })
    .catch(err => {
      res.writeHead(500);
      res.end(err);
      return;
    });
});

server.on('clientError', (err, socket)=> {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(port, hostname, () =>{
  console.log(`Server running at http://${hostname}:${port}/`)
})
