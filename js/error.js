'use strict';

(function () {
  var TEMPLATE_STYLE = 'line-height: 40px; top: -70px;';

  var errorHandler = function (errorMessage) {
    errorTemplateElement.querySelector('.error__title').textContent = errorMessage;
    errorTemplateElement.style = TEMPLATE_STYLE;
    errorTemplateElement.querySelector('.error__inner').removeChild(errorButtonElement);
    document.body.appendChild(errorTemplateElement);
  };

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorButtonElement = errorTemplateElement.querySelector('.error__button');

  window.error = {
    show: errorHandler
  };
})();
