'use strict';

(function () {
  var openSuccess = function () {
    document.querySelector('main').appendChild(successTemplateElement);
    successButtonElement.addEventListener('click', successCloseHandler);

    if (typeof openSuccessCallback === 'function') {
      openSuccessCallback();
    }
  };

  var closeSuccess = function () {
    document.querySelector('main').removeChild(successTemplateElement);
    successButtonElement.removeEventListener('click', successCloseHandler);

    if (typeof closeSuccessCallback === 'function') {
      closeSuccessCallback();
    }
  };

  var successOpenHandler = function () {
    openSuccess();
  };

  var successCloseHandler = function () {
    closeSuccess();
  };

  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var successButtonElement = successTemplateElement.querySelector('.success__button');

  var openSuccessCallback;
  var closeSuccessCallback;

  window.formSuccess = {
    show: function (openCallback, closeCallback) {
      openSuccessCallback = openCallback;
      closeSuccessCallback = closeCallback;
      successOpenHandler();
    },
    close: closeSuccess,
    templateElement: successTemplateElement
  };
})();
