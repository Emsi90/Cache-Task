import { URL, TIME, WEBAPI, STORAGENAME } from './constants.js';
import { middleware } from './middleware.js'
import { renderUI } from './view.js'

document.addEventListener('DOMContentLoaded', function(e) {

  const config = {
    url: URL,
    time: TIME,
    webapi: WEBAPI.COOKIE,
    storageName: STORAGENAME
  }

	console.log('[app.js]');
  let data = middleware.fetchData(config);
  data.then(data => renderUI(data));

});

