'use strict';

(function () {

  var openError = function (errorTitle, errorMessage) {
    mainElement.appendChild(errorTemplateElement);
    errorTitleElement.textContent = errorTitle;
    errorButtonElement.textContent = errorMessage;

    errorButtonElement.addEventListener('click', errorButtonClickHandler);
    errorTemplateElement.addEventListener('click', areaErrorCloseClickHandler);
    uploadImageElement.classList.add('hidden');

    if (typeof openErrorCallback === 'function') {
      openErrorCallback();
    }
  };

  var closeError = function () {
    mainElement.removeChild(errorTemplateElement);
    errorButtonElement.removeEventListener('click', errorButtonClickHandler);
    errorTemplateElement.removeEventListener('click', areaErrorCloseClickHandler);
    uploadImageElement.classList.remove('hidden');
    uploadOverlayElement.classList.add('hidden');

    if (typeof closeSuccessCallback === 'function') {
      closeErrorCallback();
    }
  };

  var errorButtonClickHandler = function () {
    closeError();
  };

  var areaErrorCloseClickHandler = function (evt) {
    if (evt.target === errorTemplateElement) {
      closeError();
    }
  };

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorTitleElement = errorTemplateElement.querySelector('.error__title');
  var errorButtonElement = errorTemplateElement.querySelector('.error__button');
  var uploadImageElement = document.querySelector('.img-upload');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var mainElement = document.querySelector('main');

  var openErrorCallback;
  var closeErrorCallback;

  window.messageError = {
    show: function (title, message, openCallback, closeCallback) {
      openErrorCallback = openCallback;
      closeErrorCallback = closeCallback;
      openError(title, message);
    },
    close: closeError
  };
})();
