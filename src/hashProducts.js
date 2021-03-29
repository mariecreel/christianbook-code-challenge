function hashProducts (productsJSON) {
  /*
     This funciton creates a hash table where the unique id of the products
     is the key and the position of the product in the records
     array is the value. This is intended to speed up the search for each
     client by avoiding a linear search for API requests; In this case, the
     records array only needs to be traversed in linear order once to create the
     hash table, rather than being traversed each time a search is made.
  */
    let hashTable = {};
    for (let i=0; i<productsJSON.records.length; i++) {
      hashTable[productsJSON.records[i].id] = i;
    }
    return hashTable;
}

module.exports = hashProducts;
