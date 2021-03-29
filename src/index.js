function buttonHandler(event){
  /*
    This event handler takes value from search box and passes it to
    fetchProduct, but only if the search box is not empty.
  */
  let searchBox = document.getElementById('productID');
  // this is the text input box
  if (searchBox.value != ''){
    fetchProduct(searchBox.value)
  }
}

function searchHandler(event){
  /*
    This event handler listens to keydown events on the input box where users
    type their product ID. If the user hits enter while selecting the input box,
    this is equivalent to clicking the "Search Products" button.
  */
  let keycode = window.event.keyCode;
  if (keycode == 13){
    document.getElementById('search-button').click()
   }
}

async function fetchProduct(id){
  /*
    This function takes a string as input and makes a call to our REST API to
    check whether or not there's a product that matches user input If we get a
    200 response, the object is passed to the makeCard function. If not, we
    display an error message below the search box.
  */
  let url=`/product/${id}`;
  const response = await fetch(url, {method: 'GET', mode: 'same-origin'});

  if (response.status == '200'){
    // product exists, so don't show error message.
    if (document.getElementById('error').style.display != 'none') {
      document.getElementById('error').style.display = 'none';
    }
    // send product to makeCard so that it will show as a search result.
    let product = await response.json()
    makeCard(product)
    // this next if statement is only relevant after initial search.
    // should only fire if the results were hidden because of an error message
    // from the server.
    if (document.getElementById('product-card').style.display == 'none') {
      document.getElementById('product-card').style.display = null;
    }

  } else {
    // API call has failed because product doesn't exist
    // this block lets the user know that the search has failed
    document.getElementById('error').style.display = 'block';
    if (document.getElementById('product-card')) {
    document.getElementById('product-card').style.display = 'none'
    }
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

  if (results.children.length != 0) {
    // if we've searched before, there's no need to delete/create elements
    // so we just change the inner text and attributes as needed
    document.getElementById('card-link').href = prodObj.link;
    document.getElementById('card-title').innerText = prodObj.title;
    document.getElementById('card-image').src = prodObj.image;

    if (prodObj.isbn == '') {
      document.getElementById('isbn').style.display = 'none';
    } else {
      document.getElementById('isbn').innerText = `ISBN: ${prodObj.isbn}`;
      document.getElementById('isbn').style.display = null;
    }

    if (prodObj.isbn13 == '') {
      document.getElementById('isbn13').style.display = 'none';
    } else {
      document.getElementById('isbn13').innerText = `ISBN13: ${prodObj.isbn13}`;
      document.getElementById('isbn13').style.display = null;
    }

  } else {
    // if the results div has no children, that means a search hasn't happened
    // yet, because this block inserts children on a successful first search.
    // we also add results header so that it's clear to the user that the
    // product displayed is a search result

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
    link.target = "_blank"

    let image = document.createElement('img');
    image.id = 'card-image'
    image.src = prodObj.image;
    link.appendChild(image);

    let title = document.createElement('h3');
    title.id = 'card-title'
    title.innerText = prodObj.title;
    link.appendChild(title);

    let description = document.createElement('ul')
    description.id = 'description';

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

    if (prodObj.isbn != '') {
      isbn.style.display = null;
    } else {
      isbn.style.display = 'none';
    }

    if (prodObj.isbn13 != '') {
      isbn13.style.display = null;
    } else {
      isbn13.style.display = 'none'
    }

    card.appendChild(link);
    card.appendChild(description);
    results.appendChild(card)
  }
}
