const express = require('express')
const app = express();
const products = require('./products.json');
const hostname = '127.0.0.1';
const port = 3001;

app.use(express.static('public'))

app.get('/product', (req, res)=>{
  let productID = req.query.productID;
  for(let i=0; i < products.records.length; i++){
    if(products.records[i].id == productID){
      return res.send(products.records[i])
    }
  }
  return res.status(404).send("Sorry, that product doesn't exist!")
})

app.listen(port, ()=>{
  console.log(`app listening at http://localhost:${port}`)
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry, I can't find that!")
})
