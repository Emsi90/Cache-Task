import { URL, COOKIETIME } from './constants.js';
import { fetchData } from './middleware.js';
import { displayLastUpdate, btnAction } from './view.js';

document.addEventListener('DOMContentLoaded', function (e) {

	console.log('[app.js]');

	displayLastUpdate();
	fetchData(URL, COOKIETIME);
	btnAction(() => fetchData(URL, COOKIETIME));

});