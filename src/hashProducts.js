export function hashProducts(productsJSON){
  /* This funciton creates a hash table where the unique id of the products
     is the key and the position of the product object in the records
     array is the value. This is intended to speed up the search for each
     client by avoiding a linear search; In this case, the records array
     only needs to be traversed in linear order once to create the hash table,
     rather than being traversed each time a search is made. Of course, this
     is a linear search, so for a massive database of products, this initial
     traversal is going to be very slow.
  */
    let productHashTable = {};
    for(let i=0; i<productsJSON.records.length; i++){
      productHashTable[productsJSON.records[i].id] = i;
    }
    return productHashTable;
}
