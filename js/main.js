'use strict';

var randomPhotos = window.generate.generateRandomPhotos();

var photoSelectHandler = function (index) {
  window.photoPopup.open(randomPhotos[index]);
};

window.photos.activate(photoSelectHandler);
window.photos.render(randomPhotos);

var openPopupCallback = function () {
  window.formScale.activate();
  window.formEffect.activate();
  window.formHashtags.activate(hashtagsFocusHandler, hashtagsBlurHandler);
  window.formComments.activate(commentsFocusHandler, commentsBlurHandler);
};

var closePopupCallback = function () {
  window.formScale.deactivate();
  window.formEffect.deactivate();
  window.formHashtags.deactivate();
  window.formComments.deactivate();
};

var documentKeydownEscPopupHandler = function (evt) {
  if (evt.key === KEY_ESC) {
    closePopup();
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

window.popupForm.activate(openPopupCallback, closePopupCallback);
