const express = require('express')
const app = express();
const hashProducts = require('./hashProducts.js')
const products = require('./products.json');
const hostname = '127.0.0.1';
const port = 3001;

const productsHashTable = hashProducts(products)

app.use(express.static('src'))

app.get('/product/:id', (req, res)=>{
  // console.log(`API request made! Query: ${req.params.id}`)
  let productID = req.params.id;
  // debug: console.log('productID is', productID)
  if(productsHashTable[productID]){
    // debug: console.log('index is', productsHashTable[productID]);
    return res.status(200).send(
      JSON.stringify(products.records[productsHashTable[productID]])
    );
  }else{
  return res.status(404).send("Sorry, that product doesn't exist.")
  }
})

app.listen(port, ()=>{
  console.log(`app listening at http://${hostname}:${port}`)
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry, I can't find that!")
})
