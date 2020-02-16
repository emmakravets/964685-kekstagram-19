'use strict';

(function () {
  var errorHandler = function (errorMessage) {
    errorTemplateElement.querySelector('.error__title').textContent = errorMessage;
    errorTemplateElement.style.top = '-70px';
    errorTemplateElement.style.lineHeight = '40px';
    errorTemplateElement.querySelector('.error__inner').removeChild(errorButton);
    document.body.appendChild(errorTemplateElement);
  };

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorTemplateElement.querySelector('.error__button');

  window.error = {
    show: errorHandler
  };
})();
