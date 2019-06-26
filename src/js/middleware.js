import { WEBAPI } from './constants.js';
import { setCookie, setCookieTime, getCookie, checkCookieInStorage } from './cookie.js';
import { setLocalStorageExpTime, checkLocalInStorage } from './localStorage.js';
import { IndexDbInit } from './indexDb.js'
import { displayContent, displayLastUpdate } from "./view.js";

export function fetchData(url, cookieTime) {

	displayContent();

	fetch(url)
		.then(response => response.json())
		.then(myJson => {

			console.log(myJson);

			if (myJson.status === 'error') {
				return myJson.message;
			}
			// Cookie
			setWebApi({
				author: myJson.articles[0].author,
				desc: myJson.articles[0].description,
				time: cookieTime
			}, url);

		})
		.catch(error => console.log(error));

}

function setWebApi(obj, url) {

	switch(WEBAPI) {
		case 'COOKIE':
			checkSetCookie(obj, url);
		break;
		case 'LOCALSTORAGE':
			checkSetLocalStorage(obj, url);
		break;
		case 'SESSIONSTORAGE':
			checkSetSessionStorage(obj, url);
		break;
		case 'INDEXDB':
			checkSetIndexDB(obj, url);
		break;
		default:
			checkSetCookie(obj, url);
	}

}

function checkSetCookie(obj) {

	let strCookie = `author:${obj.author}|desc:${obj.desc}`;

	if (strCookie !== getCookie('data')) {
		setTimeout(() => {
			displayContent(obj.author, obj.desc);
			setCookie('data', strCookie, obj.time);
			if (!!getCookie('data')) setCookieTime(obj.time);
			displayLastUpdate();
		}, 1000);
	} else {
		displayLastUpdate();
		checkCookieInStorage();
	}

}

function checkSetLocalStorage(obj) {

	let data = JSON.stringify(obj);
	let getLocal = localStorage.getItem('data');
	if(data !== getLocal) {
		setTimeout(() => {
			localStorage.setItem('data', data);
			displayContent(obj.author, obj.desc);
			setLocalStorageExpTime(obj.time);
			displayLastUpdate();
		}, 1000);
	} else {
		
		displayLastUpdate();
		checkLocalInStorage(obj);
	}

}

function checkSetIndexDB(obj) {
	console.log(obj);
	IndexDbInit(obj);

}