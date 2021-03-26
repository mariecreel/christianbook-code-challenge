async function _fetchProduct(id){
  let _URL=`/product/${id}`;
  const response = await fetch(_URL, {method: 'GET', mode: 'same-origin'});
    // we're making a request to our own server, hence same-origin (not CORS)
  if(response.status == 200){
    product = await response.JSON()
    console.log(product)
  }
}

export default function searchHandler (event){
  let searchBox = document.getElementById('productID');
  if(searchBox.value!=""){
    let product = _fetchProduct(searchBox.value)
  }
}
