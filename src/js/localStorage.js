export function setLocalStorageExpTime(minutes) {

  let date = new Date();
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  // let updateObj = JSON.parse(obj);
  // updateObj.time = date;
  // localStorage.setItem('date', JSON.stringify(updateObj));

  localStorage.setItem('dataExp', date);

}

export function checkLocalStorageTime() {

  let time = localStorage.getItem('dataExp');
  let expDate = new Date(time);
  let presentDate = new Date();

  if(expDate < presentDate) {
    localStorage.removeItem('data');
    localStorage.removeItem('dataExp');
    return true;
  } else {
    return false
  }

}