'use strict';

(function () {

  var HASHTAG_SYMBOL = '#';
  var HASHTAG_LENGTH_LIMIT = 20;
  var HASHTAG_HASH_LIMIT = 1;
  var HASHTAGS_SEPARATOR = ' ';
  var HASHTAGS_COUNT_LIMIT = 5;

  var HashtagsValidationMessages = {
    hashtagStart: 'Хэштег должен начинаться с # (решётка)',
    notOneHashSymbol: 'Хэштег не может состоять только из одной решётки',
    hashtagLimit: 'Хэштег не должен превышать ' + HASHTAG_LENGTH_LIMIT + ' символов',
    hashtagBanSymbols: 'Строка после решётки должна состоять только из букв и чисел. Использование других символов недопустимо',
    hashtagCase: 'Хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом',
    spacesBetweenHashtags: 'Хэштеги должны разделяться пробелами',
    hashtagsCountLimit: 'Нельзя указать больше пяти хэштегов',
    hashtagsRepeats: 'Один и тот же хэштег не может быть использован дважды'
  };

  var validateHashtag = function (tag) {
    if (tag[0] !== HASHTAG_SYMBOL) {
      return HashtagsValidationMessages.hashtagStart;
    }
    if (tag === HASHTAG_SYMBOL) {
      return HashtagsValidationMessages.notOneHashSymbol;
    }
    if (tag.length > HASHTAG_LENGTH_LIMIT) {
      return HashtagsValidationMessages.hashtagLimit;
    }
    if (!/^#[a-zA-Z0-9]+/.test(tag)) {
      return HashtagsValidationMessages.hashtagBanSymbols;
    }
    if (tag.split(HASHTAG_SYMBOL).length - 1 > HASHTAG_HASH_LIMIT) {
      return HashtagsValidationMessages.spacesBetweenHashtags;
    }
    return '';
  };

  var hasAnyHashtagRepeat = function (hashtags) {
    return hashtags.some(function (searchHashtag, seachIndex) {
      return hashtags.some(function (hashtag, index) {
        return hashtag === searchHashtag && seachIndex !== index;
      });
    });
  };

  var hasRegisterHashtagRepeat = function (hashtags) {
    return hashtags.some(function (searchHashtag, seachIndex) {
      return hashtags.some(function (hashtag, index) {
        return hashtag.toLowerCase() === searchHashtag.toLowerCase() && seachIndex !== index;
      });
    });
  };

  var validateHashtags = function (value) {
    var hashtags = value.split(HASHTAGS_SEPARATOR);
    var validationMessage;

    if (hashtags.length > HASHTAGS_COUNT_LIMIT) {
      return HashtagsValidationMessages.hashtagsCountLimit;
    }

    if (hasAnyHashtagRepeat(hashtags)) {
      return HashtagsValidationMessages.hashtagsRepeats;
    }

    if (hasRegisterHashtagRepeat(hashtags)) {
      return HashtagsValidationMessages.hashtagCase;
    }
    for (var i = 0; i < hashtags.length; i++) {
      validationMessage = validateHashtag(hashtags[i]);
      if (!validationMessage) {
        return validationMessage;
      }
    }
    return validationMessage;
  };

  var hashtagsInputElement = document.querySelector('.text__hashtags');
  var hashtagsFocusCallback;
  var hashtagsBlurCallback;

  var hashtagsInputChangeHandler = function (evt) {
    hashtagsInputElement.setCustomValidity(validateHashtags(evt.target.value));
  };

  var hashtagsInputFocusHandler = function () {
    if (typeof hashtagsFocusCallback === 'function') {
      hashtagsFocusCallback();
    }
  };

  var hashtagsInputBlurHandler = function () {
    if (typeof hashtagsBlurCallback === 'function') {
      hashtagsBlurCallback();
    }
  };

  window.form = {
    activate: function (focusCallback, blurCallback) {
      hashtagsFocusCallback = focusCallback;
      hashtagsBlurCallback = blurCallback;

      hashtagsInputElement.addEventListener('change', hashtagsInputChangeHandler);
      hashtagsInputElement.addEventListener('focus', hashtagsInputFocusHandler);
      hashtagsInputElement.addEventListener('blur', hashtagsInputBlurHandler);
    },
    deactivate: function () {
      hashtagsInputElement.removeEventListener('change', hashtagsInputChangeHandler);
      hashtagsInputElement.removeEventListener('focus', hashtagsInputFocusHandler);
      hashtagsInputElement.removeEventListener('blur', hashtagsInputBlurHandler);
    }
  };
})();
