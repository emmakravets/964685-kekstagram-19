'use strict';

(function () {

  var COMMENT_LENGTH_LIMIT = 140;

  var commentValidateMessage = 'Длина комментария не может составлять больше ' + COMMENT_LENGTH_LIMIT + ' символов';

  var validateComments = function (comment) {
    if (comment.length > COMMENT_LENGTH_LIMIT) {
      return commentValidateMessage;
    }
    return '';
  };

  var commentsInputElement = document.querySelector('.text__description');
  var commentsFocusCallback;
  var commentsBlurCallback;

  var commentsInputChangeHandler = function (evt) {
    commentsInputElement.setCustomValidity(validateComments(evt.target.value));
  };

  var commentsInputFocusHandler = function () {
    if (typeof commentsFocusCallback === 'function') {
      commentsFocusCallback();
    }
  };

  var commentsInputBlurHandler = function () {
    if (typeof commentsBlurCallback === 'function') {
      commentsBlurCallback();
    }
  };

  window.form.comments = {
    activate: function (focusCallback, blurCallback) {
      commentsFocusCallback = focusCallback;
      commentsBlurCallback = blurCallback;

      commentsInputElement.addEventListener('change', commentsInputChangeHandler);
      commentsInputElement.addEventListener('focus', commentsInputFocusHandler);
      commentsInputElement.addEventListener('blur', commentsInputBlurHandler);
    },
    deactivate: function () {
      commentsInputElement.removeEventListener('change', commentsInputChangeHandler);
      commentsInputElement.removeEventListener('focus', commentsInputFocusHandler);
      commentsInputElement.removeEventListener('blur', commentsInputBlurHandler);
    }
  };
})();
