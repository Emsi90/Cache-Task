import { renderUI } from './view.js'; 

export let storageController = (function(){

  function checkStorage(data) {

    renderUI.displayContent({}); // for spinners

    data.then(data => {
    
      let newData = data.storageToOutput(data.obj);
      let oldData = data.getStorage();
      let presentDate = new Date();
      let pastDate = data.getStorageTime();

      if(newData === oldData  && presentDate < pastDate) {
  
        let storageData = data.transformStorageToObj();
        let obj = {...storageData}
        renderUI.displayContent(obj);
        checkTime(data, presentDate);
  
      } else {
  
        let obj = {
          author: data.obj.author,
          desc: data.obj.desc
        }
        setTimeout(() => {

          renderUI.displayContent(obj);
          data.setStorage();
          data.setStorageTime();
          checkTime(data, presentDate);

        }, 2000);
      }
    });

  }
  

  function checkTime(data, presentDate) {
    if(data.checkStorageTime()) {
      renderUI.displayLastUpdate(presentDate);
    }
  }

  return {
    checkStorage: checkStorage
  }

})();