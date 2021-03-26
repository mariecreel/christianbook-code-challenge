const express = require('express')
const app = express();
const hashProducts = require('./hashProducts.js')
const products = require('./products.json');
const hostname = '127.0.0.1';
const port = 3001;

const productsHashTable = hashProducts(products)
console.log(productsHashTable)

app.use(express.static('public'))

app.get('/product', (req, res)=>{
  let productID = req.query.productID;
  console.log('productID is', productID)
  if(productsHashTable[productID]){
    console.log('index is', productsHashTable[productID]);
    return res.send(JSON.stringify(products.records[productsHashTable[productID]]));
  }
  return res.status(404).send("Sorry, that product doesn't exist!")
})

app.listen(port, ()=>{
  console.log(`app listening at http://${hostname}:${port}`)
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry, I can't find that!")
})
