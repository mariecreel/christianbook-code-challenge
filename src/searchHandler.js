

async function _fetchProduct(id){
  let _URL=`/product/${id}`;
  const response = await fetch(_URL, {method: 'GET', mode: 'same-origin'});
  if(response.status == 200){

  } else {
    
  }
}

export function searchHandler (event){
  let searchBox = document.getElementById('productID');
  if(searchBox.value!=""){

  }
}
