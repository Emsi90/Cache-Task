import { URL, TIME, WEBAPI, STORAGENAME } from './constants.js';
import { middleware } from './middleware.js'
import { storageController } from './controllers.js'
import { renderUI } from './view.js'

document.addEventListener('DOMContentLoaded', function() {

  const config = {
    url: URL,
    time: TIME,
    webapi: WEBAPI.COOKIE,
    storageName: STORAGENAME
  }

  console.log('[app.js]');
  
  let data = middleware.fetchData(config);
  renderUI.btnAction(() => storageController.checkStorage(data));
  storageController.checkStorage(data); // Check Data from Storage

});

