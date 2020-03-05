'use strict';

(function () {
  var openPopup = function () {
    uploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadCloseElement.addEventListener('click', uploadPopupCloseHandler);

    if (openPopupCallback) {
      openPopupCallback();
    }
  };

  var closePopup = function () {
    uploadOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadCloseElement.removeEventListener('click', uploadPopupCloseHandler);

    if (closePopupCallback) {
      closePopupCallback();
    }
  };

  var uploadPopupCloseHandler = function () {
    closePopup();
  };

  var uploadFilePopupHandler = function () {
    openPopup();
  };

  var resetPopupForm = function () {
    uploadFormElement.reset();
  };

  var uploadFormSubmitHandler = function (evt) {
    console.log('submit');
    if (submitFormCallback) {
      submitFormCallback(new FormData(uploadFormElement));
    }

    evt.preventDefault();
  };

  var uploadImageElement = document.querySelector('.img-upload');
  var uploadFileElement = uploadImageElement.querySelector('#upload-file');
  var uploadCloseElement = document.querySelector('#upload-cancel');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadFormElement = document.querySelector('.img-upload__form');

  var openPopupCallback;
  var closePopupCallback;
  var submitFormCallback;

  window.popupForm = {
    activate: function (openCallback, closeCallback, submitCallback) {
      openPopupCallback = openCallback;
      closePopupCallback = closeCallback;
      submitFormCallback = submitCallback;

      uploadFileElement.addEventListener('change', uploadFilePopupHandler);
      uploadFormElement.addEventListener('submit', uploadFormSubmitHandler);
    },
    deactivate: function () {
      openPopupCallback = null;
      closePopupCallback = null;
      submitFormCallback = null;

      uploadFileElement.removeEventListener('change', uploadFilePopupHandler);
      uploadFormElement.removeEventListener('submit', uploadFormSubmitHandler);
    },
    reset: resetPopupForm,
    close: closePopup
  };
})();
