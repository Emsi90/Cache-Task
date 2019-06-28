export let renderUI = (function() {

  let authorText = document.querySelector('.header');
  let contentText = document.querySelector('.content');
  let button = document.querySelector('.updateBtn');
  let updateDesc = document.querySelector('.updateDesc');
  let time = document.querySelector('.updateDate');

  function btnAction(fn) {
    
    button.addEventListener('click', () => {
      button.classList.add('animate');
      button.addEventListener('webkitTransitionEnd', () => {
        button.classList.remove('animate');
      }, false);
      fn();
    }, false);
  
  }

  function displayContent(obj) {

    if (!obj.author && !obj.desc) {
      authorText.classList.add('loader');
      contentText.classList.add('loader');
      authorText.textContent = '';
      contentText.textContent = '';
    } else {
      authorText.classList.remove('loader');
      contentText.classList.remove('loader');
      authorText.textContent = !obj.author || obj.author === 'null' ? 'No Name' : obj.author;
      contentText.textContent = !obj.desc || obj.desc === 'null' ? 'No Desc' : obj.desc;
    }
  }

  function displayLastUpdate(date) {
  
    time.textContent = date.toLocaleString();
  
  };

  return {
    displayContent: displayContent,
    btnAction: btnAction,
    displayLastUpdate: displayLastUpdate
  }

})();