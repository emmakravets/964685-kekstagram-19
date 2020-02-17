'use strict';

(function () {
  var openError = function () {
    document.querySelector('main').appendChild(errorTemplateElement);
    errorButtonElement.addEventListener('click', errorCloseHandler);
    uploadImageElement.classList.add('hidden');

    if (typeof openErrorCallback === 'function') {
      openErrorCallback();
    }
  };

  var closeError = function () {
    document.querySelector('main').removeChild(errorTemplateElement);
    errorButtonElement.removeEventListener('click', errorCloseHandler);
    uploadImageElement.classList.remove('hidden');
    uploadOverlayElement.classList.add('hidden');

    if (typeof closeSuccessCallback === 'function') {
      closeErrorCallback();
    }
  };

  var errorOpenHandler = function () {
    openError();
  };

  var errorCloseHandler = function () {
    closeError();
  };

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorButtonElement = errorTemplateElement.querySelector('.error__button');
  var uploadImageElement = document.querySelector('.img-upload');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');

  var openErrorCallback;
  var closeErrorCallback;

  window.formError = {
    show: function (openCallback, closeCallback) {
      openErrorCallback = openCallback;
      closeErrorCallback = closeCallback;
      errorOpenHandler();
    },
    close: closeError,
    templateElement: errorTemplateElement
  };
})();
