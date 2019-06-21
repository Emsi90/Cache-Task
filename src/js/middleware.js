import { WEBAPI } from './variables.js';
import { displayContent, displayLastUpdate, checkDataInStorage } from "./view.js";
import { setCookie, setCookieTime, getCookie } from './cookie.js'
import { setLocalStorageExpTime } from './localStorage.js'

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
		default:
			checkSetCookie(obj, url);
	}

}


function checkSetCookie(obj, url) {

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
		checkDataInStorage(() => fetchData(url, obj.time));
	}

}

function checkSetLocalStorage(obj, url) {

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
		checkDataInStorage(() => fetchData(url, obj.time));
	}

}