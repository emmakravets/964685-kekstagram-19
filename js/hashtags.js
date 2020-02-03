'use strict';

var HASHTAG_LENGTH_LIMIT = 20;
var HASHTAGS_COUNT_LIMIT = 5;
var SEPARATOR = ' ';
var HASH_SYMBOL = '#';

/* var validateHashtags = function (value) {
  var hashtags = value.split(SEPARATOR);

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== HASH_SYMBOL) {
      hashtagsInputElement.setCustomValidity('Хэштег должен начинаться с # (решётка)');
    } else if (hashtags[i] === HASH_SYMBOL && hashtags[i].length === 1) {
      hashtagsInputElement.setCustomValidity('Хэштег не может состоять только из одной решётки');
    } else if (hashtags[i].length > HASHTAG_LENGTH_LIMIT) {
      hashtagsInputElement.setCustomValidity('Хэштег не должен превышать ' + HASHTAG_LENGTH_LIMIT + ' символов');
    } else if (hashtags[i].split(HASH_SYMBOL).length > 2) {
      hashtagsInputElement.setCustomValidity('Хэштеги должны разделяться пробелами');
    } else if (hashtags.length !== HASHTAGS_COUNT_LIMIT) {
      hashtagsInputElement.setCustomValidity('Нельзя указать больше пяти хэштегов');
    } else if (hashtags.slice(i + 1).find(function (item) {
      return hashtags[i] === item;
    })) {
      hashtagsInputElement.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
    }
  }
};
*/

var validateHashtag = function (tag) {
  if (tag[0] !== HASH_SYMBOL) {
    return 'Хэштег должен начинаться с # (решётка)';
  } else if (tag === HASH_SYMBOL && tag.length === 1) {
    return 'Хэштег не может состоять только из одной решётки';
  } else if (tag.length > HASHTAG_LENGTH_LIMIT) {
    return 'Хэштег не должен превышать ' + HASHTAG_LENGTH_LIMIT + ' символов';
  } else if (tag.split(HASH_SYMBOL).length > 2) {
    return 'Хэштеги должны разделяться пробелами';
  } else if (tag.slice(1).find(function (item) {
    return tag === item;
  })) {
    return 'Один и тот же хэштег не может быть использован дважды';
  }
  return '';
};

var validateHashtags = function (value) {
  var hashtags = value.split(SEPARATOR);
  var validationMessage;
  if (hashtags.length > HASHTAGS_COUNT_LIMIT) {
    validationMessage = 'Нельзя указать больше пяти хэштегов';
  } else {
    validationMessage = hashtags.find(validateHashtag);
  }
  hashtagsInputElement.setCustomValidity(validationMessage);
};

var hashtagsInputElement = document.querySelector('.text__hashtags');

hashtagsInputElement.addEventListener('change', function (evt) {
  validateHashtags(evt.target.value);
});
