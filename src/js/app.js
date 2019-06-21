import { URL, COOKIETIME } from './variables.js';
import { fetchData } from './middleware.js';
import { displayLastUpdate, checkDataInStorage, btnAction } from './view.js';

document.addEventListener('DOMContentLoaded', function(e) {

    console.log('[app.js]');

    displayLastUpdate();
    checkDataInStorage(fetchData(URL, COOKIETIME));
    btnAction(() => fetchData(URL, COOKIETIME));

});