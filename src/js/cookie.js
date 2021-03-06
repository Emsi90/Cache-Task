import { displayContent } from './view.js';

export function setCookie(name, value, minutes) {
  let expires = '';
  if (minutes) {
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";

}

export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function setCookieTime(cookieTime) {

  let date = new Date();
  setCookie('dateTime', date.toLocaleString(), cookieTime);

}

export function checkCookieInStorage() {

  if (!!getCookie('data')) {

    let cookie = getCookie('data').split('|');
    let arrCookie = cookie.map(item => {
      return item.split(':');
    });

    let obj = Object.fromEntries(arrCookie);

    displayContent(obj.author, obj.desc);

  } 

};