# Christianbook Product Search

Marie Creel - March 2021 - MIT License

## About

TODO: Explain how app works

## Performance

### API Requests and Database Searches: Theoretical Performance

My original implementation of the database search was a simple linear search
where the server iterated through the records array from beginning to end until
it found a product ID that matched user input. In the worst case, a linear
search has O(n) complexity; this doesn't cause huge problems for a database of
size 10, but becomes problematic when the user happens to search for a product
whose index is close to the end of the array. The longer the array is, the more
likely it is that the user will experience a significant delay when searching
for a product.

To avoid this bottleneck, I decided to preprocess the database and create a
hash table that associates product IDs to the index of the matching product in
the records array. To create this hash table, I used a linear search to traverse
the records array and add an entry to the hash table for each object in the
array. Then, when responding to API requests, the server simply checks to see
whether the product ID is stored as a key in the hash table or not. If so, the
server uses the index stored in the hash table to retrieve the product
information from the records array. If not, the server sends a 404 response.

While this process still uses a linear search to create the hash table, rather
than iterating over the array every time a request is made, the database only
needs to be iterated over from beginning to end once, reducing the amount of
times that a search of O(n) complexity has to be completed. Now, whenever the
user searches for a product, they trigger a search of O(2) complexity
because the server only needs to retrieve the value of the associated index
from the hash table and then use that index to retrieve the product information
from the records array. Two steps for a search is much faster than the worst
case scenario for the O(n) search, and the complexity for this search will not
increase as the size of the database increases.

I suspect that the initial linear search through the database could also be
optimized by using a different algorithm, such as a binary search. However, the
binary search requires that the information being searched is sorted, which
is not the case for the provided database. Furthermore, because we need to visit
each element in the records array at least once to create the hash table, I'm
not positive that using a different search algorithm would improve performance,
unless the search made use of multiple concurrent threads.

### Load Testing with Concurrent Clients: Actual performance

To loadtest my website, I used the NPM package [<code>loadtest</code>]
(https://www.npmjs.com/package/loadtest) which allowed me to specify the number
of concurrent users, the number of requests per second, and the total amount of
time to run the load test. Admittedly, this was my first time load testing a
site that I had built, so I wasn't exactly sure how many requests per second was
 realistic given the number of concurrent users I wanted to test (100, 1000,
10000, 100000, 1000000). I originally decided to limit the number of requests
per second to the number of concurrent users (so 100 users meant 100 requests
per second), and ran each test for 1000 seconds, or 16 minutes and ~40 seconds.
However, as I moved up to 1000 users and 1000 tests, I overwhelmed my CPU and my
computer repeatedly stalled and crashed; I'm running a MacBook Air with 8GB of
ram and a quad-core 1.1GHz cpu, which I understand is less than the bare minimum
recommended memory for a web server.



It's important to note that the requests per second are shared across all
concurrent users according to the loadtest documentation, so if there were 10
users and the requests per second were limited to 10, then each user would only
be able to make one request per second.

I tested both requests to load the site and API requests (<code>http://localhost:
3001</code> and <code>http://localhost:3001/product/823662</code> respectively)



## Time Spent in Development

I spent 7 hours developing the app according to the specification provided, then
!!!!!<TODO: insert hours here>!!!!! hours load testing the application.

## Possible Improvements

I decided not to use a frontend framework when building the UI because I felt
confident in my ability to write all the necessary front end functions in
vanilla JavaScript. However, because I wrote the front end using vanilla JS,
some of the code is inelegant, repetitive, and unlikely to scale well. For example, when creating
the card that displays the search results for a particular product ID, create a
large number of elements using functions like <code>document.createElement(...)</code>
and <code>document.getElementById(...).style.display(...)</code> that make the
code difficult to read quickly for any errors when debugging. The obvious
solution here would be to use a templating library like handlebars.js or built-in
templating tools in frameworks like React or Svelte to programmatically update
the DOM each time a search is made. I've done this in other projects,
and it would definitely clean up the code here as well. This would be even more
necessary if we were expecting multiple results in response to our query rather
than just one result; I'd have to repeat the code I've written for any possible
number of returned objects, which is impossible without some kind of template to
fill in by iterating over the returned results.

## Sources Consulted

[NodeJS documentation: How do I start with Node.js after I installed it?](https://nodejs.org/en/docs/guides/getting-started-guide/)

[NodeJS v15.12.0 Documentation: HTTP](https://nodejs.org/api/http.html#http_class_http_server)

[Express Getting Started Guide: Serving static files in Express](https://expressjs.com/en/starter/static-files.html)

[Express Documentation: Routing](https://expressjs.com/en/guide/routing.html)

[MDN Web Docs: Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

[StackExchange: Trigger a button click with JavaScript on the Enter key in a text box](https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box)

[MDN Web Docs: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).
