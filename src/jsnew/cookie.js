import Storage from './classes.js';

class CookieStorage extends Storage {

  constructor(obj, config) {
    super(obj, config);
    this.cookieValue = `author:${obj.author}|desc:${obj.desc}`;
  }

  setStorage(
    storageName = this.storageName,
    cookieValue = this.cookieValue,
    time = this.time) {

    let expires = '';
    if (time) {
      let date = new Date();
      date.setTime(date.getTime() + (time * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    
    document.cookie = storageName + "=" + (cookieValue || "") + expires + "; path=/";

  }

  getStorage(name = this.storageName) {

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


  setStorageTime() {

    let date = new Date();
    date.setTime(date.getTime() + (this.time * 60 * 1000));
    this.setStorage( `${this.storageName}Time`, date);

  }

  getStorageTime() {

    let date;

    if(this.checkStorageTime()) {
      date = new Date(this.getStorage(`${this.storageName}Time`));
    } else {
      date = new Date(0);
    }

    return date;

  }

  checkStorageTime() {

    let checkStorageTime = !!this.getStorage(`${this.storageName}Time`)
    if(checkStorageTime) {
      return true;
    }

  }

  transformStorageToObj() {

    if (!!this.getStorage(this.storageName)) {

      let cookie = this.getStorage(this.storageName).split('|');
      let arrCookie = cookie.map(item => {
        return item.split(':');
      });

      let obj = Object.fromEntries(arrCookie);

      return obj;

    }

  }

  storageToOutput(obj) {
    let strCookie = `author:${obj.author}|desc:${obj.desc}`;
    return strCookie;
  }

}

export default CookieStorage;