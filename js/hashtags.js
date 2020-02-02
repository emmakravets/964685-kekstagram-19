'use strict';

var HASHTAG_LENGTH_LIMIT = 20;
var HASHTAGS_COUNT_LIMIT = 5;
var SEPARATOR = ' ';
var HASH_SYMBOL = '#';

var validateHashtags = function (value) {
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

var hashtagsInputElement = document.querySelector('.text__hashtags');

hashtagsInputElement.addEventListener('change', function (evt) {
  validateHashtags(evt.target.value);
});
