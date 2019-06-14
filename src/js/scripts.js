const URL = 'https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=7a036c609ffa4e1485bc2cde47622085';

function fetchData(url) {

  console.log('testtt')
  displayContent();

  fetch(url)
    .then(response => response.json())
    .then(myJson => {

      if(myJson.status === 'error') {
        return myJson.message;
      }

      setTimeout(() => {
        displayContent(myJson.articles[0].author, myJson.articles[0].description);
      }, 1000);

    })
    .catch(error => console.log(error));

}

fetchData(URL);
// how we can do, to return json/obj. Normal is promise bcs is asyn and we no have it yet. (async/await)

let button = document.querySelector('.updateBtn');
button.addEventListener('click', function() {
  fetchData(URL);
}, false);


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