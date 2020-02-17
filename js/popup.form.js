'use strict';

(function () {
  var openPopup = function () {
    uploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadCloseElement.addEventListener('click', uploadPopupCloseHandler);

    if (typeof openPopupCallback === 'function') {
      openPopupCallback();
    }
  };

  var closePopup = function () {
    uploadOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    uploadCloseElement.removeEventListener('click', uploadPopupCloseHandler);

    if (typeof closePopupCallback === 'function') {
      closePopupCallback();
    }
  };

  var uploadPopupCloseHandler = function () {
    closePopup();
  };

  var uploadFilePopupHandler = function () {
    openPopup();
  };

  var uploadImageElement = document.querySelector('.img-upload');
  var uploadFileElement = uploadImageElement.querySelector('#upload-file');
  var uploadCloseElement = document.querySelector('#upload-cancel');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadFormElement = document.querySelector('.img-upload__form');

  var openPopupCallback;
  var closePopupCallback;

  window.popupForm = {
    activate: function (openCallback, closeCallback) {
      openPopupCallback = openCallback;
      closePopupCallback = closeCallback;

      uploadFileElement.addEventListener('change', uploadFilePopupHandler);
    },
    deactivate: function () {
      openPopupCallback = null;
      closePopupCallback = null;

      uploadFileElement.removeEventListener('change', uploadFilePopupHandler);
    },
    close: closePopup,
    uploadForm: uploadFormElement,
    uploadOverlay: uploadOverlayElement
  };
})();
