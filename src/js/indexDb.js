import { displayContent } from './view.js'

export function IndexDbInit(data) {

  let dat = [];

  for(let [key, value] of Object.entries(data)) {
    dat.push({[key]: value});
  }

  let request = indexedDB.open('data', 2),
        db,
        tx,
        store,
        index;

  request.onupgradeneeded = function(e) {
    db = request.result;
    
    store = db.createObjectStore('articles', { autoIncrement : true });
    index = store.createIndex('author', 'author', {unique: false});

    store.transaction.oncomplete = function(e) {
      var articleObjectStore = db.transaction('articles', 'readwrite').objectStore('articles');
      dat.forEach(item => {
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
    db = e.target.result;
    var transaction = db.transaction(["articles"]);
    var objectStore = transaction.objectStore("articles");
    var request = objectStore.getAll();

    request.onsuccess = function(e) {
      console.log(request.result)

      displayContent(request.result[0].author, request.result[1].desc)
    };

  }

}