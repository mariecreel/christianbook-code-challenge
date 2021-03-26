const express = require('express')
const app = express();
const products = require('./products.json');
const fs = require('fs').promises;
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'))

app.get('/product', (req, res)=>{
  res.send('hello world')
})

app.listen(port, ()=>{
  console.log(`app listening at http://localhost:${3000}`)
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry, I can't find that!")
})
