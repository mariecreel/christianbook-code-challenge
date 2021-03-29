# Christianbook Product Search

Marie Creel - March 2021 - MIT License

## About

This website allows users to search for a product in a product database. Users
provide a unique product ID as input and in response, the website renders a
short description of the product if it exists, or displays an error message if
it doesn't exist. Users can click on the image or the name of the product and
navigate to a corresponding product listing on Christianbook.com.

## Performance

### API Requests and Database Searches: Theoretical Performance

<span style="color:pink"><em>
How will your system perform with a 1 product in file? 10 products in file? 100 products in file?
</em></span>

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

<span style="color:pink"><em>
How will your system perform with 100 users? 10000 users? 1000000 users?
</em></span>

To loadtest my website, I used the NPM package
[<code>loadtest</code>](https://www.npmjs.com/package/loadtest) which allowed me
 to specify the number of concurrent users, the number of requests per second,
and the total amount of time to run the load test. Admittedly, this was my
first time load testing a site that I had built, so I wasn't exactly sure how
many requests per second was realistic given the number of concurrent users I
wanted to test (100, 1000, 10000, 100000, 1000000). I originally decided to
limit the number of requests per second to the number of concurrent users (so
100 users meant 100 requests per second), and ran each test (besides the first
two tests for 100 users) for 500 seconds, However, as I moved up to 1000 users
and 1000 tests, I overwhelmed my CPU and my computer repeatedly stalled and
crashed; I'm running a MacBook Air with 8GB of ram and a quad-core 1.1GHz cpu,
which I understand is less than the bare minimum recommended memory for a high
traffic web server. I suspect that this has impacted the results of my load
testing, especially in the case of high concurrency.

Before I discuss the results in depth, It's important to note that the requests
per second are shared across all concurrent users according to the loadtest
documentation, so if there were 10 users and the requests per second were
limited to 10, then each user would only be able to make one request per second.

I tested for a range of users between 100 and 100000 users, not running load
tests for 1000000 users.

The site performed well at 100 users regardless of
whether or not there were 100, 200, or 300 requests per second, averaging a
latency of 12.2ms. Strangely, there was a 0.05% error rate when the request rate
was set to 200/second, but none for 100/s or 300/s.

When I increased the users to 1000, the mean latency was 11.3ms across 100, 200,
and 300 requests per second, and errors only started to occur when 300 requests
per second were made, with an error rate of 0.17%.

Increasing the users to 10000 resulted in a higher error rate across all request
rates: 100 requests per second produced a 39.4% error rate, 200 requests per
second produced a 49.4% error rate, and 300 requests per second produced a 46.7%
error rate. Each increase in requests per second also increased the total number
of requests made, but even with these increased totals, the error rate remained
consistently in the ~40% - ~50% range. Average latency across all tests for
10000 users was 4.2 seconds, which is high enough that I expect there would be
a noticeable delay for the users who didn't get errors in response to their
requests.

## Time Spent in Development

I spent 7 hours developing the app according to the specification provided,
then 3 hours load testing the application.

If I had infinite time to work on this project, I would prioritize server
optimization over front end concerns. I'd like to know that the server could
handle a large number of requests before failing in the face of something like
a holiday rush or a surge of users over their lunch break.

I'd also test the software on a production server to ensure that the faults
revealed in loadtesting were not the result of faulty code but of memory issues.

Once I'd finished optimizing the server, I'd then move on to designing the front
end. Currently, the front end works and is simply designed, but I would 

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
