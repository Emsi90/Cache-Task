import CookieStorage from './cookie.js'

export let middleware = (function() {

  let storage = null; ;

  let fetchData = function(config) {

    return fetch(config.url)
		.then(response => response.json())
		.then(myJson => {

			if (myJson.status === 'error') {
				return myJson.message;
      }
      
      // return myJson;
      return setWebApi({
				author: myJson.articles[0].author,
				desc: myJson.articles[0].description,
      },
      {
        time: config.time,
        webapi: config.webapi,
        storageName: config.storageName
      }
      );

		})
		.catch(error => console.log(error));

  }

  let setWebApi = function(obj, config) {

    switch(config.webapi) {
      case 'COOKIE':
        storage = new CookieStorage(obj, config);
      break;
      case 'LOCALSTORAGE':
        console.log('LocalStorage');
      break;
      case 'SESSIONSTORAGE':
        console.log('SessionStorage');
      break;
      case 'INDEXDB':
        console.log('IndexDb');
      break;
      default:
        console.log('localStorage');
    }

    return storage;

  }

  return {
    fetchData: function(config) {
      return fetchData(config);
    }
  }

})();

