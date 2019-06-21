import { getCookie } from './cookie.js'
import { checkLocalStorageTime } from './localStorage.js'

export function btnAction(fn) {

  let button = document.querySelector('.updateBtn');
  button.addEventListener('click', () => fn(), false);

}

export function displayContent(author, content) {
  let authorText = document.querySelector('.header');
  let contentText = document.querySelector('.content');

  if (!author && !content) {
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

export function checkDataInStorage(fn) {

  // console.log(fn());
  if (!!getCookie('data')) {

    let cookie = getCookie('data').split('|');
    let arrCookie = cookie.map(item => {
      return item.split(':');
    });

    let obj = Object.fromEntries(arrCookie);

    displayContent(obj.author, obj.desc);

  } else if(!!localStorage.getItem('data')) {

    if(checkLocalStorageTime()) {
      fn();
    } else {
      let obj = JSON.parse(localStorage.getItem('data'));
      displayContent(obj.author, obj.desc);
    }

  }

};

export function displayLastUpdate() {

  let time = document.querySelector('.updateDate');
  let obj = localStorage.getItem('dataExp');

  if (!!getCookie('dateTime')) {
    time.textContent = new Date().toLocaleString();
  } else if (!!obj) {
    time.textContent = new Date().toLocaleString();
  }

};