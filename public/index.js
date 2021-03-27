function buttonHandler(event){
  /*
  this event handler takes value from search box and passes it to
  fetchProduct if the search box is not empty. Not validating input further
  because we get a 404 response status if the product entered doesn't exist.
  */
  let searchBox = document.getElementById('productID');
  // this is the text input box
  if(searchBox.value!=''){
    let product = fetchProduct(searchBox.value)
  }
}

async function fetchProduct(id){
  /*
  This function takes a string as input and makes a call to our REST API to
  check whether or not there's a product that has matches the string input by
  the user. If we get a 200 response, the object is passed to the makeCard
  function. If not, we display an error message in the results div.
  */
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

function makeCard(prodObj){
  /*
  This function takes an object returned from our API call as input. On the
  first time this function is run, the elements for a display card are
  created and populated by attributes of the product object returned
  from our GET request.

  All consecutive calls to this function only change the content and
  style of elements that already exist, rather than deleting and creating
  elements as necessary. For example, if the ISBN and ISBN13 attributes
  are empty, then their display style attribute is changed to 'none'.
  */
  console.log(prodObj);

  if(results.children.length!= 0){
    // if we've searched before, there's no need to delete/create elements
    document.getElementById('card-link').href = prodObj.link;
    document.getElementById('card-title').innerText = prodObj.title;
    document.getElementById('card-image').src = prodObj.image;

    if(prodObj.isbn == ''){
      document.getElementById('isbn').style.display = 'none';
    } else {
      document.getElementById('isbn').innerText = `ISBN: ${prodObj.isbn}`;
      document.getElementById('isbn').style.display = null;
    }

    if(prodObj.isbn13 == ''){
      document.getElementById('isbn13').style.display = 'none';
    } else {
      document.getElementById('isbn13').innerText = `ISBN13: ${prodObj.isbn13}`;
      document.getElementById('isbn13').style.display = null;
    }

  } else {
    // add results header so that it's clear the card is a search result
    results = document.getElementById('results');
    let header = document.createElement('h2');
    header.innerText = 'Results:'
    document.getElementsByClassName('product-search')[0].appendChild(header)

    // making the card for an individual product on first search
    let card = document.createElement('div');
    card.id = 'product-card';

    let link = document.createElement('a');
    link.id = 'card-link';
    link.href = prodObj.link;

    let image = document.createElement('img');
    image.id = 'card-image'
    image.src = prodObj.image;
    link.appendChild(image);

    let title = document.createElement('h3');
    title.id = 'card-title'
    title.innerText = prodObj.title;
    link.appendChild(title);

    let description = document.createElement('ul')
    description.id = "description";

    let rating = document.createElement('li')
    rating.id = 'rating'
    rating.innerText = `Customer Rating: ${prodObj.customer_rating} out of 5`
    description.appendChild(rating);

    let isbn13 = document.createElement('li');
    isbn13.id = 'isbn13';
    isbn13.innerText = `ISBN13: ${prodObj.isbn13}`;
    description.appendChild(isbn13);

    let isbn = document.createElement('li');
    isbn.id = 'isbn';
    isbn.innerText = `ISBN: ${prodObj.isbn}`;
    description.appendChild(isbn);

    if(prodObj.isbn != ''){
      isbn.style.display = null;
    } else {
      isbn.style.display = 'none';
    }

    if(prodObj.isbn13 != ''){
      isbn13.style.display = null;
    } else {
      isbn13.style.display = 'none'
    }

    card.appendChild(link);
    card.appendChild(description);
    console.log(description)
    results.appendChild(card)
  }
}
