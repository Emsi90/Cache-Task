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

      

      // Other
      localStorage.setItem('data', data);
      sessionStorage.setItem('data', data);

      addDataToIndexDb(myJson.articles);
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
let db = null;
(function createDb() {

  let request = indexedDB.open('data', 2);

  request.onerror = function(event) {
    console.log("Database error: " + event.target.errorCode);
  }

  request.onsuccess = function(event) {
    db = event.target.result;
  }

  request.onupgradeneeded = function(event) {
    db = event.target.result;

    let objectStore = db.createObjectStore('articles', { autoIncrement : true });

  }

})();

function addDataToIndexDb(data) {

  var customerObjectStore = db.transaction("articles", "readwrite").objectStore("articles");
    data.forEach(function(item) {
      if(item.author !== null) {
        customerObjectStore.add(item);
      } else {
        customerObjectStore.add('No Name');
      }
    });

}

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