import { getCookie } from './cookie.js'

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

export function displayLastUpdate() {

  let time = document.querySelector('.updateDate');
  let obj = localStorage.getItem('dataExp');

  if (!!getCookie('dateTime')) {
    time.textContent = new Date().toLocaleString();
  } else if (!!obj) {
    time.textContent = new Date().toLocaleString();
  }

};