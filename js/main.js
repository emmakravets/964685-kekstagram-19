'use strict';

(function () {
  var KEY_ESC = 'Escape';

  var openPopupCallback = function () {
    window.formScale.activate();
    window.formEffect.activate();
    window.formHashtags.activate(hashtagsFocusHandler, hashtagsBlurHandler);
    window.formComments.activate(commentsFocusHandler, commentsBlurHandler);

    window.popupForm.uploadForm.addEventListener('submit', submitFormHandler);
    document.addEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var closePopupCallback = function () {
    window.formScale.deactivate();
    window.formEffect.deactivate();
    window.formHashtags.deactivate();
    window.formComments.deactivate();

    window.popupForm.uploadForm.removeEventListener('submit', submitFormHandler);
    document.removeEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var openSuccessCallback = function () {
    document.addEventListener('keydown', documentKeydownEscSuccessHandler);
    window.formSuccess.templateElement.addEventListener('click', areaCloseSuccessHandler);
  };

  var closeSuccessCallback = function () {
    document.removeEventListener('keydown', documentKeydownEscSuccessHandler);
    window.formSuccess.templateElement.removeEventListener('click', areaCloseSuccessHandler);
  };

  var openErrorCallback = function () {
    document.addEventListener('keydown', documentKeydownEscErrorHandler);
    window.formSuccess.templateElement.addEventListener('click', areaCloseErrorHandler);
  };

  var closeErrorCallback = function () {
    document.removeEventListener('keydown', documentKeydownEscErrorHandler);
    window.formSuccess.templateElement.removeEventListener('click', areaCloseErrorHandler);
  };

  var documentKeydownEscPopupHandler = function (evt) {
    if (evt.key === KEY_ESC) {
      window.popupForm.close();
    }
  };

  var documentKeydownEscSuccessHandler = function (evt) {
    if (evt.key === KEY_ESC) {
      window.formSuccess.close();
    }
  };

  var documentKeydownEscErrorHandler = function (evt) {
    if (evt.key === KEY_ESC) {
      window.formError.close();
    }
  };

  var areaCloseSuccessHandler = function (evt) {
    if (evt.target === window.formSuccess.templateElement) {
      window.formSuccess.close();
    }
  };

  var areaCloseErrorHandler = function (evt) {
    if (evt.target === window.formError.templateElement) {
      window.formError.close();
    }
  };

  var hashtagsFocusHandler = function () {
    document.removeEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var hashtagsBlurHandler = function () {
    document.addEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var commentsFocusHandler = function () {
    document.removeEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var commentsBlurHandler = function () {
    document.addEventListener('keydown', documentKeydownEscPopupHandler);
  };

  window.backend.load(function (photos) {
    var photoSelectCallback = function (index) {
      window.popupPhoto.open(photos[index]);
    };
    window.photos.render(photos);
    window.photos.activate(photoSelectCallback);
    window.popupForm.activate(openPopupCallback, closePopupCallback);
  }, function (errorMessage) {
    window.error.show(errorMessage);
  });

  var submitFormHandler = function (evt) {
    window.backend.upload(new FormData(window.popupForm.uploadForm), function () {
      window.popupForm.uploadOverlay.classList.add('hidden');
      window.formSuccess.show(openSuccessCallback, closeSuccessCallback);
    }, function () {
      window.formError.show(openErrorCallback, closeErrorCallback);
    });
    evt.preventDefault();
  };
})();
