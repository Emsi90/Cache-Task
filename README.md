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


1. COOKIE
- old, hopeless API
- they are send to server with every task (pros and cons)
- not safe (CRDF, XSS)
- limit only 4kb

When use cookie:
- like tracker (like google do)
- store user session
- store tokens

When shouldn't use cookies
- to chaching
- dont save interface state (modal, popup etc.)
- dont use in javascript


2. WEBSTORAGE (local storage, session storage)
- the same interface
- local storage storage data for ever until to someone delete them
- session storage only storage data in session, until to close tab
- minimum 2mb
- have to be string (we can use JSON.stringify)

What store in DOM Storage?
- interface state
- forms values
- Tokens using by JS (API Tokens, Json web tokens)

What shouldn't store in DOM Storage?
- store which we need in web or service worker
- blob (binary data) / we have to convert to string (base64) etc.
- Data collection (all time serialize - deserialize etc)

3. INDEXDB (noSQL)
What store in INDEXDB?
- Data collection
- Binary Data
- store request HTTP

What shouldn't store in DOM Storage?
- simple data
- everything what we can store in cookie or DOM Storage
