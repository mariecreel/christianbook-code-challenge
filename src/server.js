const express = require('express')
const app = express();
const hashProducts = require('./hashProducts.js')
const products = require('./products.json');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000; // to deploy to heroku

// create the hash table of product IDs and indices
const productsHashTable = hashProducts(products)

// this ensures that express serves the static index.html
app.use(express.static('src'))

app.get('/product/:id', (req, res)=>{
  // this handles API requests, :id matches user input
  let productID = req.params.id;
  if (productsHashTable[productID] != undefined) {
    // if we have a product for the given id
    return res.status(200).send(
      // send that product as a response
      JSON.stringify(products.records[productsHashTable[productID]])
    );
  } else {
    // otherwise, send 404
    return res.status(404).send("Sorry, that product doesn't exist.")
  }
})

app.listen(port, ()=>{
  console.log(`app listening at http://${hostname}:${port}`)
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry, I can't find that!")
})
