class CookieStorage {

  constructor(obj, config) {
    this.obj = obj;
    this.time = config.time;
    this.storageName = config.storageName;
    this.cookieValue = `author:${this.obj.author}|desc:${this.obj.desc}`;
  }

  setCookie() {

    let expires = '';
    if (this.time) {
      let date = new Date();
      date.setTime(date.getTime() + (this.time * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = this.storageName + "=" + (this.cookieValue || "") + expires + "; path=/";

  }

  getCookie() {
    var nameEQ = this.storageName + "=";
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


  setCookieTime() {

    let date = new Date();
    this.setCookie( `${this.fromEntries}Time`, date.toLocaleString(), this.time);

  }

  checkCookieInStorage() {

    if (!!this.getCookie(this.storageName)) {

      let cookie = this.getCookie(this.storageName).split('|');
      let arrCookie = cookie.map(item => {
        return item.split(':');
      });

      let obj = Object.fromEntries(arrCookie);

      return obj;

    }

  }

}

  export default CookieStorage;