'use strict';

(function () {
  var KEY_ESC = 'Escape';

  /* var photoSelectCallback = function (index) {
    window.popupPhoto.open(randomPhotos[index]);
  }; */

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

  var documentKeydownEscPopupHandler = function (evt) {
    if (evt.key === KEY_ESC) {
      window.popupForm.close();
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

  window.backend.load(window.photos.render, window.error.show);

  window.backend.load(function (photos) {
    var photoSelectCallback = function (index) {
      window.popupPhoto.open(photos[index]);
    };
    window.photos.activate(photoSelectCallback);
    window.popupForm.activate(openPopupCallback, closePopupCallback);
  });
})();
