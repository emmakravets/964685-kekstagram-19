'use strict';

(function () {
  var KEY_ESC = 'Escape';
  var ErrorMessage = {
    LOAD_ACTION: 'Перезагрузить страницу',
    UPLOAD_TITLE: 'Ошибка загрузки файла',
    UPLOAD_ACTION: 'Загрузить другой файл'
  };

  var openPopupCallback = function () {
    window.formScale.activate();
    window.formEffect.activate();
    window.formHashtags.activate(hashtagsFocusHandler, hashtagsBlurHandler);
    window.formComments.activate(commentsFocusHandler, commentsBlurHandler);

    document.addEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var closePopupCallback = function () {
    window.formScale.deactivate();
    window.formEffect.deactivate();
    window.formHashtags.deactivate();
    window.formComments.deactivate();

    document.removeEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var openSuccessCallback = function () {
    document.addEventListener('keydown', documentKeydownEscSuccessHandler);
  };

  var closeSuccessCallback = function () {
    document.removeEventListener('keydown', documentKeydownEscSuccessHandler);
  };

  var openErrorCallback = function () {
    document.addEventListener('keydown', documentKeydownEscErrorHandler);
  };

  var closeErrorCallback = function () {
    document.removeEventListener('keydown', documentKeydownEscErrorHandler);
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
      window.messageError.close();
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
    var filterSelectCallback = function () {
      return photos;
    };
    window.photos.render(photos);
    window.photos.activate(photoSelectCallback);
    window.filter.activate(filterSelectCallback);
    window.filter.show();

    window.popupForm.activate(openPopupCallback, closePopupCallback, submitFormCallback);
  }, function (errorMessage) {
    window.messageError.show(
        errorMessage,
        ErrorMessage.LOAD_ACTION,
        undefined,
        function () {
          window.location.reload();
        }
    );
  });

  var submitFormCallback = function (formData) {
    window.backend.upload(formData, function () {
      window.popupForm.reset();
      window.messageSuccess.activate(openSuccessCallback, closeSuccessCallback);
      closePopupCallback();
    }, function () {
      window.messageError.show(
          ErrorMessage.UPLOAD_TITLE,
          ErrorMessage.UPLOAD_ACTION,
          openErrorCallback,
          closeErrorCallback
      );
      closePopupCallback();
    });
  };
})();
