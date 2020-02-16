'use strict';

(function () {
  var LINE_HEIGHT = '40px';
  var TOP = '-70px';

  var errorHandler = function (errorMessage) {
    errorTemplateElement.querySelector('.error__title').textContent = errorMessage;
    errorTemplateElement.style.top = TOP;
    errorTemplateElement.style.lineHeight = LINE_HEIGHT;
    errorTemplateElement.querySelector('.error__inner').removeChild(errorButtonElement);
    document.body.appendChild(errorTemplateElement);
  };

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorButtonElement = errorTemplateElement.querySelector('.error__button');

  window.error = {
    show: errorHandler
  };
})();
