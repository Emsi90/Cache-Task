const URL = 'https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=7a036c609ffa4e1485bc2cde47622085';
const COOKIETIME = 1;


function fetchData(url) {

  displayContent();

  fetch(url)
    .then(response => response.json())
    .then(myJson => {

      if(myJson.status === 'error') {
        return myJson.message;
      }

      // Cookie
      let strCookie = `author:${myJson.articles[0].author}|content:${myJson.articles[0].description}`;

      if (strCookie !== getCookie('data')) {
        setTimeout(() => {
          displayContent(myJson.articles[0].author, myJson.articles[0].description);
          setCookie('data', strCookie, COOKIETIME);
          if(!!getCookie('data')) setCookieTime();
          displayLastUpdate();
        }, 1000);
      } else {
        checkDataInCookies();
      }
      // Our JSON has a more than 4kb
      let data = JSON.stringify(myJson);
      // console.log(myJson);

      // Other
      let dataEx = JSON.stringify(myJson.articles); 
      // localStorage.setItem('data', data);
      sessionStorage.setItem('data', data);

      let date = new Date();
      // localStorage.setItem('expTime', date);
      // console.log(date);
      // console.log(localStorage.getItem('expTime'));
      // console.log(new Date(date - new Date(localStorage.getItem('expTime'))).getMinutes());

      let expTime = new Date(localStorage.getItem('expTime'));
      let timeCondition = new Date(date - expTime).getMinutes();

      if(!expTime || timeCondition >= 1) {
        localStorage.setItem('expTime', date);
        localStorage.setItem('data', data);
      }

      // console.log('PRESENT DATE - ', date);
      // console.log('DATE IN LOCALSTORE - ', expTime);
      // console.log('TIME DIFFERENT (minutes) - ', timeCondition);

      // addDataToIndexDb(myJson.articles);
      // IndexDbInit(myJson.articles)
      // addNote();

    })
    .catch(error => console.log(error));

}

// fetchData(URL);
// how we can do, to return json/obj. Normal is promise bcs is asyn and we no have it yet. (async/await)

let button = document.querySelector('.updateBtn');
button.addEventListener('click', () => fetchData(URL), false);


function displayContent(author, content) {
  let authorText = document.querySelector('.header');
  let contentText = document.querySelector('.content');

  if(!author && !content) {
    authorText.classList.add('loader');
    contentText.classList.add('loader');
    authorText.textContent = '';
    contentText.textContent = ''; 
  } else {
    authorText.classList.remove('loader');
    contentText.classList.remove('loader');
    authorText.textContent = author;
    contentText.textContent = content; 
  }
}

//=======================
// COOKIE
// We can only send (in chrome)
// 4096 bytes per cookie // 4.096 KB
// 180 cookies per domain
// 81920 bytes per domain* // 180*4096 = 737280 bytes. 
//=======================
function setCookie(name, value, minutes) {
  let expires = '';
  if(minutes) {
    let date = new Date();
    date.setTime(date.getTime() + (minutes*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";

}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');

  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1,c.length);
      }
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
  // if(document.cookie.includes(name)) {
  //   console.log('testtt')
  // }
}

function checkDataInCookies() {

  if(!!getCookie('data')) {

    let cookie = getCookie('data').split('|');
    let arrCookie = cookie.map(item => {
      return item.split(':');
    });

    let obj =  Object.fromEntries(arrCookie);

    displayContent(obj.author, obj.content);

  } else {
    fetchData(URL);
  }

};

checkDataInCookies();

function setCookieTime() {

  let date = new Date();
  setCookie('dateTime', date.toLocaleString(), COOKIETIME);

}

function displayLastUpdate() {

  let time = document.querySelector('.updateDate');

  if(!!getCookie('dateTime')) {
    time.textContent = getCookie('dateTime');
  }

};

displayLastUpdate();

//=======================
// IndexDB
//=======================

function IndexDbInit(data) {

  let request = indexedDB.open('data', 2),
        db,
        tx,
        store,
        index;

  request.onupgradeneeded = function(e) {
    let db = request.result;
    
    store = db.createObjectStore('articles', { autoIncrement : true });
    index = store.createIndex('author', 'author', {unique: false});

    store.transaction.oncomplete = function(e) {
      var articleObjectStore = db.transaction('articles', 'readwrite').objectStore('articles');
      data.forEach(item => {
          articleObjectStore.add(item);
        });
    }
    
    // tx = db.transaction('articles', 'readwrite');
    // store = tx.objectStore('articles');
    // index = store.index('author');
    
    // let articleObjectStore = db.transaction('articles', 'readwrite').objectStore('articles');
    // data.forEach(item => {
    //   articleObjectStore.add(item);
    // });

    // let res = store.getAll();

    // res.onsuccess = function(e) {
    //   console.log('hereeeee',  res.result);
    // };

  }

  request.onerror = function(e) {
    console.log("there was an error: " + e.target.errorCode);
  }
    
  request.onsuccess = function(e) {
    db = request.result;
    var transaction = db.transaction(["articles"]);
    var objectStore = transaction.objectStore("articles");
    var request = objectStore.getAll();

    request.onsuccess = function(e) {
    };

  }

}

// function addDataToIndexDb(data) {

//   var articleObjectStore = db.transaction('articles', 'readwrite').objectStore('articles');
//     data.forEach(function(item) {
//       articleObjectStore.add(item);
//     });

// }




// Other example
function addNote() {
  const note = {
      title: "note" + Math.random(),
      text: "This is my note"
  }
  const tx = db.transaction("articles", "readwrite")
  tx.onerror = e => alert( ` Error! ${e.target.error}  `)
  const pNotes = tx.objectStore("articles")
  pNotes.add(note)
}


// ==============================
// FETCH DATA EXC
// ==============================
function fetchData2(url) {

  return fetch(url)
    .then(response => response.json())
    .then(myJson => {

      console.log(myJson);

    })
    .catch(error => console.log(error));

}

// console.log('Result', fetchData2(URL).then(res => res));


const getPromiseJSON = async (url) => {
  try{
      const user = await fetch(url);
      const body = await user.json();
      return body;
  }
  catch (err) {
    throw new Error(err);
  }
 };
 
//  const superData = getPromiseJSON(URL)
//   .then(user => console.log(user))
//   .catch(err => console.log(err))

//  console.log(superData) // promise


 const request = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  console.log(json);
}

console.log(request());

/*

1. COOKIE
- old, hopeless API
- they are send to server with every task (pros and cons)
- not safe (CRDF, XSS)
- limit only 4kb

When use cookie:
- like tracker (like google do)
- store user session
- store tokens

When dont use cookies
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

What dont store in DOM Storage?
- store which we need in web or service worker
- blob (binary data) / we have to convert to string (base64) etc.
- Data collection (all time serialize - deserialize etc)

3. INDEXDB (noSQL)
What store in INDEXDB?
- Data collection
- Binary Data
- store request HTTP

What dont store in DOM Storage?
- simple data
- everything what we can store in cookie or DOM Storage

*/