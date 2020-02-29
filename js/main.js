'use strict';

(function () {
  var KEY_ESC = 'Escape';
  var ErrorMessage = {
    LOAD_ACTION: 'Перезагрузить страницу',
    UPLOAD_TITLE: 'Ошибка загрузки файла',
    UPLOAD_ACTION: 'Загрузить другой файл',
    PHOTO_UPLOAD_TITLE: 'Неверный формат изображения',
    PHOTO_UPLOAD_ACTION: 'Выберите другое изображение'
  };

  var blurFormElementHandler = function () {
    document.addEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var focusFormElementHandler = function () {
    document.removeEventListener('keydown', documentKeydownEscPopupHandler);
  };

  var openPhotoErrorCallback = function () {
    window.messageError.show(
        ErrorMessage.PHOTO_UPLOAD_TITLE,
        ErrorMessage.PHOTO_UPLOAD_ACTION,
        openErrorCallback,
        closeErrorCallback
    );
  };

  var openPopupCallback = function () {
    window.formScale.activate();
    window.formEffect.activate();
    window.formHashtags.activate(focusFormElementHandler, blurFormElementHandler);
    window.formComments.activate(focusFormElementHandler, blurFormElementHandler);

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

  var photos;

  window.backend.load(function (loadedPhotos) {
    photos = loadedPhotos;
    var photoSelectCallback = function (index) {
      window.popupPhoto.open(photos[index]);
    };
    var filterSelectCallback = function (filter) {
      photos = filter(loadedPhotos);
      window.photos.clear();
      window.photos.render(photos);
    };
    window.photos.render(photos);
    window.photos.activate(photoSelectCallback);
    window.filter.activate(filterSelectCallback);
    window.popupForm.activate(openPopupCallback, closePopupCallback, submitFormCallback);
    window.photoUpload.activate(openPhotoErrorCallback);
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
