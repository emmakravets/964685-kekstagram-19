'use strict';

(function () {
  var openSuccess = function () {
    mainElement.appendChild(successTemplateElement);
    uploadOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    successButtonElement.addEventListener('click', successButtonClickHandler);
    successTemplateElement.addEventListener('click', areaSuccessCloseHandler);

    if (openSuccessCallback) {
      openSuccessCallback();
    }
  };

  var closeSuccess = function () {
    mainElement.removeChild(successTemplateElement);
    successButtonElement.removeEventListener('click', successButtonClickHandler);
    successTemplateElement.removeEventListener('click', areaSuccessCloseHandler);

    if (closeSuccessCallback) {
      closeSuccessCallback();
    }
  };

  var successButtonClickHandler = function () {
    closeSuccess();
  };

  var areaSuccessCloseHandler = function (evt) {
    if (evt.target === successTemplateElement) {
      closeSuccess();
    }
  };

  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var successButtonElement = successTemplateElement.querySelector('.success__button');
  var mainElement = document.querySelector('main');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');

  var openSuccessCallback;
  var closeSuccessCallback;

  window.messageSuccess = {
    activate: function (openCallback, closeCallback) {
      openSuccessCallback = openCallback;
      closeSuccessCallback = closeCallback;
      openSuccess();
    },
    deactivate: function () {
      openSuccessCallback = null;
      closeSuccessCallback = null;
    },
    close: closeSuccess
  };
})();
