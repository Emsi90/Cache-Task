import Storage from './classes.js';

class LocalStorage extends Storage {

  setStorageTime(time = this.time) {
    let date = new Date();
    date.setTime(date.getTime() + (time * 60 * 1000));
    localStorage.setItem(`${this.storageName}Time`, date);
  }

  setStorage() {
    localStorage.setItem(this.storageName, JSON.stringify(this.obj));
  }

  getStorageTime() {
    return new Date(localStorage.getItem(`${this.storageName}Time`));
  }

  checkStorageTime() {
    return !!localStorage.getItem(`${this.storageName}Time`);
  }
  
  getStorage() {
    let obj = localStorage.getItem(this.storageName);
    return obj;
  }

  storageToOutput(data) {
    let obj = JSON.stringify(data);
    return obj;
  }

  transformStorageToObj() {
    let obj = JSON.parse(localStorage.getItem(this.storageName));
    return obj;
  }

}

export default LocalStorage;