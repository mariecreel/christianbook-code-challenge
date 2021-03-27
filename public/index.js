async function fetchProduct(id){
  /*
  this function takes a string as input and makes a call to our REST API to
  check whether or not there's a product that has matches the string input by
  the user. If we get a 200 response, the object is passed to the makeCard
  function. If not, we display an error message in the results div. */
  let _URL=`/product/${id}`;
  const response = await fetch(_URL, {method: 'GET', mode: 'same-origin'});
    // we're making a request to our own server, hence same-origin
  makeCard(product)
}

function makeCard(response){
  results = document.getElementsById('results');
  let header = document.createElement('h2');
  header.innerText = 'Results:'
  if(response.status == 200){
    // if OK, we display the product
    if(results.children.length!= 0){
      // if we've searched before, there's no need to re-render the whole thing
      let card = document.getElementById('product-card')

    } else {
      // making the card for an individual pr
      let card = document.createElement('div');
      card.id = 'product-card';
      let
    }
  } else {
    //if 404, display error in card
  }
}

function searchHandler(event){
  /*
  this event handler takes value from search box and passes it to
  _fetchProduct if the search box is not empty. Not validating input further
  because we get a 404 response status if the product entered doesn't exist.
  */
  let searchBox = document.getElementById('productID');
  // this is the text input box
  if(searchBox.value!=''){
    let product = fetchProduct(searchBox.value)
  }
}
