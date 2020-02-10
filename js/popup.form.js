'use strict';

(function () {
  var KEY_ESC = 'Escape';

  var openPopup = function () {
    editImageFormElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    uploadPopupCloseElement.addEventListener('click', uploadPopupCloseHandler);
    document.addEventListener('keydown', documentKeydownEscPopupHandler);

    window.formScale.activate();
    window.formEffect.activate();
    window.formHashtags.activate(hashtagsFocusHandler, hashtagsBlurHandler);
    window.formComments.activate(commentsFocusHandler, commentsBlurHandler);
  };

  var closePopup = function () {
    editImageFormElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    uploadPopupCloseElement.removeEventListener('click', uploadPopupCloseHandler);
    document.removeEventListener('keydown', documentKeydownEscPopupHandler);

    window.formScale.deactivate();
    window.formEffect.deactivate();
    window.formHashtags.deactivate();
    window.formComments.deactivate();
  };

  var editImageFormElement = document.querySelector('.img-upload__overlay');
  var uploadPopupCloseElement = document.querySelector('#upload-cancel');

  var uploadPopupCloseHandler = function () {
    closePopup();
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

  window.popup = {
    open: openPopup
  };
})();
