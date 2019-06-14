# Cache Task

1. Create a web page with news section and update button (Clicking in update news should be updated from the server)
2. Create middleware which will cache news on client side (discover different options) 
3. After page loads
   а. If there is no data in cache: load from API (show loading indicator),put data into cache and show on UI
   b. if there is data in cache: Show data on UI, refresh cache with new data from API, highlight update button and show message  “new data is available click update to refresh” if data is new
4. Extra:
  a. show Last Updated Date (date when data cached)
   b. ignore cache if last update date is older that one hour
   
API Example: https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=7a036c609ffa4e1485bc2cde47622085
