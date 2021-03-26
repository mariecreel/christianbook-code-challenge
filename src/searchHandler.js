async function _fetchProduct(id){
  let _URL=`/product/${id}`;
  const response = await fetch(_URL, {method: 'GET', mode: 'same-origin'});
  if(response.status == 200){
    // use object to render something on the page
  } else {
    // throw an error
  }
}

export function searchHandler (event){
  let searchBox = document.getElementById('productID');
  if(searchBox.value!=""){
    _fetchProduct(searchBox.value)
  }
}
