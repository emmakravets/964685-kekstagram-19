'use strict';

(function () {
  var KEY_ESC = 'Escape';

  var openPopup = function () {
    uploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadCloseElement.addEventListener('click', uploadPopupCloseHandler);

    if (typeof openPopupCallback === 'function') {
      openPopupCallback();
    }
    //

    document.addEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var closePopup = function () {
    uploadOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    uploadCloseElement.removeEventListener('click', uploadPopupCloseHandler);

    if (typeof closePopupCallback === 'function') {
      closePopupCallback();
    }

    //
    document.removeEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var uploadPopupCloseHandler = function () {
    closePopup();
  };

  var documentKeydownEscPopupHandler = function (evt) {
    if (evt.key === KEY_ESC) {
      closePopup();
    }
  };

  var uploadFilePopupHandler = function () {
    openPopup();
  };

  var uploadImageElement = document.querySelector('.img-upload');
  var uploadFileElement = uploadImageElement.querySelector('#upload-file');
  var uploadCloseElement = document.querySelector('#upload-cancel');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');

  var openPopupCallback;
  var closePopupCallback;

  window.popupForm = {
    activate: function (openCallback, closeCallback) {
      openPopupCallback = openCallback;
      closePopupCallback = closeCallback;
      uploadFileElement.addEventListener('change', uploadFilePopupHandler);
    },
    dectivate: function () {
      openPopupCallback = null;
      closePopupCallback = null;
      uploadFileElement.removeEventListener('change', uploadFilePopupHandler);
    },
  };
})();
