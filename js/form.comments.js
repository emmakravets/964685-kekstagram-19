'use strict';

(function () {

  var COMMENT_LENGTH_LIMIT = 140;
  var INPUT_ERROR_STYLE = '#ff0000';
  var INPUT_DEFAULT_STYLE = '#ffffff';

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
    commentsInputElement.style.borderColor = INPUT_DEFAULT_STYLE;
    commentsInputElement.setCustomValidity(validateComments(evt.target.value));
  };

  var commentsInputFocusHandler = function () {
    if (commentsFocusCallback) {
      commentsFocusCallback();
    }
  };

  var commentsInputBlurHandler = function () {
    if (commentsBlurCallback) {
      commentsBlurCallback();
    }
  };

  var commentsInputInvalidHandler = function () {
    commentsInputElement.style.borderColor = INPUT_ERROR_STYLE;
  };

  window.formComments = {
    activate: function (focusCallback, blurCallback) {
      commentsFocusCallback = focusCallback;
      commentsBlurCallback = blurCallback;

      commentsInputElement.addEventListener('change', commentsInputChangeHandler);
      commentsInputElement.addEventListener('invalid', commentsInputInvalidHandler);
      commentsInputElement.addEventListener('focus', commentsInputFocusHandler);
      commentsInputElement.addEventListener('blur', commentsInputBlurHandler);
    },
    deactivate: function () {
      commentsFocusCallback = null;
      commentsBlurCallback = null;

      commentsInputElement.removeEventListener('change', commentsInputChangeHandler);
      commentsInputElement.removeEventListener('invalid', commentsInputInvalidHandler);
      commentsInputElement.removeEventListener('focus', commentsInputFocusHandler);
      commentsInputElement.removeEventListener('blur', commentsInputBlurHandler);
    }
  };
})();
