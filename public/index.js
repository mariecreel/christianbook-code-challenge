async function fetchProduct(id){
  /*
  this function takes a string as input and makes a call to our REST API to
  check whether or not there's a product that has matches the string input by
  the user. If we get a 200 response, the object is passed to the makeCard
  function. If not, we display an error message in the results div. */
  let _URL=`/product/${id}`;
  const response = await fetch(_URL, {method: 'GET', mode: 'same-origin'});
    // we're making a request to our own server, hence same-origin
  if(response.status == '200'){
    if(document.getElementById('error').style.display != 'none'){
      document.getElementById('error').style.display = 'none';
    }
    let product = await response.json()
    makeCard(product)
  } else {
    document.getElementById('error').style.display = 'inline';
  }
}

function makeCard(productJson){
  /*
  this function takes a response as input and uses information in the
  response to render search results as cards.
  */
  results = document.getElementById('results');
  let header = document.createElement('h2');
  header.innerText = 'Results:'
  if(results.children.length!= 0){
    // if we've searched before, there's no need to re-render the whole thing
    document.getElementById('card-link').href = productJson.link;
    document.getElementById('card-title').innerText = productJson.title;
    document.getElementById('card-image').src = productJson.image;

  } else {
    // making the card for an individual product on first search
    let card = document.createElement('div');
    card.id = 'product-card';

    let link = document.createElement('a');
    link.id = 'card-link';
    link.href = productJson.link;

    let image = document.createElement('img');
    image.id = 'card-image'
    image.src = productJson.image;
    link.appendChild(image);

    let title = document.createElement('h3');
    title.id = 'card-title'
    title.innerText = productJson.title;
    link.appendChild(title);

    card.appendChild(header);
    card.appendChild(link);
    results.appendChild(card)
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
