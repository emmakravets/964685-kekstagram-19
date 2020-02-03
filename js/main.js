'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USER_NAMES = ['Евкакий', 'Повсекакий', 'Мафусаил', 'Ефросинья', 'Евдокия', 'Ротибор'];
var USER_PHOTO_LIMIT = 25;

var COMMENTS_LIMIT = 10;
var COMMENTS_COUNT_MIN = 0;
var COMMENTS_COUNT_MAX = 50;
var PHOTO_DESCRIPTION = 'Описание фотографии';
var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;

var AVATAR_WIDTH = '35';
var AVATAR_HEIGHT = '35';

var PHOTO_URL_TEMPLATE = 'photos/{index}.jpg';
var AVATAR_URL_TEMPLATE = 'img/avatar-{index}.svg';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var NO_EFFECT = 'none';

var SCALE_VALUE_STEP = 25;
var SCALE_VALUE_MAX = 100;
var SCALE_VALUE_MIN = 25;
var SCALE_VALUE_DEFAULT = 100;

var HASHTAG_LENGTH_LIMIT = 20;
var HASHTAGS_COUNT_LIMIT = 5;
var SEPARATOR = ' ';
var HASH_SYMBOL = '#';

var generateRandomNumber = function (from, to) {
  return Math.round(Math.random() * (to - from) + from);
};

var getRandomItem = function (items) {
  return items[generateRandomNumber(0, items.length - 1)];
};

var generateRandomComment = function () {
  return {
    avatar: AVATAR_URL_TEMPLATE.replace('{index}', generateRandomNumber(1, 6)),
    message: getRandomItem(MESSAGES),
    name: getRandomItem(USER_NAMES)
  };
};

var generateRandomComments = function () {
  var comments = [];
  var limit = generateRandomNumber(0, COMMENTS_LIMIT);
  for (var i = 0; i < limit; i++) {
    comments.push(generateRandomComment());
  }
  return comments;
};

var generateRandomUserPhotos = function () {
  var randomUserPhotos = [];
  for (var i = 0; i < USER_PHOTO_LIMIT; i++) {
    randomUserPhotos.push({
      url: PHOTO_URL_TEMPLATE.replace('{index}', i + 1),
      description: PHOTO_DESCRIPTION,
      likes: generateRandomNumber(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
      comments: generateRandomComments()
    });
  }
  return randomUserPhotos;
};

var createUserPhotoElement = function (userPhoto) {
  var userPhotoElement = userPhotoTemplateElement.cloneNode(true);

  userPhotoElement.querySelector('.picture__img').src = userPhoto.url;
  userPhotoElement.querySelector('.picture__comments').textContent = userPhoto.comments.length + generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  userPhotoElement.querySelector('.picture__likes').textContent = userPhoto.likes;

  return userPhotoElement;
};

var renderUserPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createUserPhotoElement(photos[i]));
  }
  picturesElement.appendChild(fragment);
};

var createComment = function (comment) {
  var commentElement = commentsTemplateElement.cloneNode(true);
  var commentAvatarElement = commentElement.querySelector('.social__picture');

  commentAvatarElement.src = comment.avatar;
  commentAvatarElement.alt = comment.name;
  commentAvatarElement.width = AVATAR_WIDTH;
  commentAvatarElement.height = AVATAR_HEIGHT;

  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var clearComments = function () {
  commentsElement.innerHTML = '';
};

var renderComments = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(createComment(comments[i]));
  }
  commentsElement.appendChild(fragment);
};

var renderFullSizePhoto = function (photo) {
  fullSizePhotoElement.querySelector('img').src = photo.url;
  fullSizePhotoElement.querySelector('.likes-count').textContent = photo.likes;
  fullSizePhotoElement.querySelector('.comments-count').textContent = photo.comments.length + generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  fullSizePhotoElement.querySelector('.social__caption').textContent = photo.description;

  clearComments();
  renderComments(generateRandomComments());
};

var uploadFilePopupKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    uploadFilePopupCloseHandler();
  }
  if (evt.key === ENTER_KEY) {
    uploadFilePopupOpenHandler();
  }
};

var uploadFilePopupOpenHandler = function () {
  editImageFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', uploadFilePopupKeydownHandler);
};

var uploadFilePopupCloseHandler = function () {
  editImageFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', uploadFilePopupKeydownHandler);
  uploadFormElement.reset();
};

var effectDepthChangeHandler = function () {
  var computedEffectDepth = Math.round((effectLevelDepthElement.clientWidth * 100) / effectLevelLineElement.clientWidth);
  effectLevelValueElement.value = computedEffectDepth;
};

var calculateEffectDepth = function (index, from, to) {
  return (to - from) * index + from;
};

var setOriginEffect = function () {
  uploadImagePreviewElement.style.filter = '';
  effectLevelFieldsetElement.style.display = 'none';
};

var setCustomEffect = function (evt) {
  uploadImagePreviewElement.style.filter = effects[evt.target.value](effectLevelValueElement.value);
  effectLevelFieldsetElement.style.display = 'block';
};

var effectChangeHandler = function (element) {
  element.addEventListener('change', function (evt) {
    if (evt.target.value === NO_EFFECT) {
      setOriginEffect();
    } else {
      setCustomEffect(evt);
    }
  });
};

var setImageScale = function (scale) {
  uploadImagePreviewElement.style.transform = 'scale(' + (scale / SCALE_VALUE_MAX) + ')';
  // scaleControlValueElement.value = scale + '%';
  scaleControlValueElement.setAttribute('value', scale + '%');
  currentScale = scale;
};

var scaleControlSmallerClickHandler = function () {
  var previousScaleValue = currentScale - SCALE_VALUE_STEP;
  if (previousScaleValue >= SCALE_VALUE_MIN) {
    setImageScale(previousScaleValue);
  }
};

var scaleControlBiggerClickHandler = function () {
  var nextScaleValue = currentScale + SCALE_VALUE_STEP;
  if (nextScaleValue <= SCALE_VALUE_MAX) {
    setImageScale(nextScaleValue);
  }
};

var validateHashtag = function (tag) {
  if (tag[0] !== HASH_SYMBOL) {
    return 'Хэштег должен начинаться с # (решётка)';
  } else if (tag === HASH_SYMBOL) {
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

var photos = generateRandomUserPhotos();

var userPhotoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');
var commentsElement = document.querySelector('.social__comments');
var commentsTemplateElement = document.querySelector('.social__comment');
var fullSizePhotoElement = document.querySelector('.big-picture');
var commentsCountElement = document.querySelector('.social__comment-count');
var commentsLoaderElement = document.querySelector('.comments-loader');

var uploadFormElement = document.querySelector('.img-upload__form');
var uploadImageFieldElement = document.querySelector('.img-upload');
var uploadFilePopupElement = uploadImageFieldElement.querySelector('#upload-file');
var editImageFormElement = uploadImageFieldElement.querySelector('.img-upload__overlay');
var uploadFileCloseElement = uploadImageFieldElement.querySelector('#upload-cancel');

var effectLevelFieldsetElement = uploadImageFieldElement.querySelector('.effect-level');
var effectLevelSliderElement = effectLevelFieldsetElement.querySelector('.effect-level__pin');
var effectLevelValueElement = effectLevelFieldsetElement.querySelector('.effect-level__value');
var effectLevelLineElement = effectLevelFieldsetElement.querySelector('.effect-level__line');
var effectLevelDepthElement = effectLevelFieldsetElement.querySelector('.effect-level__depth');
var uploadImagePreviewElement = uploadImageFieldElement.querySelector('.img-upload__preview');
// var effectRadioElements = uploadImageFieldElement.querySelectorAll('.effects__radio');

var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
var scaleControlValueElement = document.querySelector('.scale__control--value');
var currentScale = SCALE_VALUE_DEFAULT;

var hashtagsInputElement = document.querySelector('.text__hashtags');

var effects = {
  'none': function () {
    return '';
  },
  'chrome': function (index) {
    return 'grayscale' + '(' + (index / 100) + ')';
  },
  'sepia': function (index) {
    return 'sepia' + '(' + (index / 100) + ')';
  },
  'marvin': function (index) {
    return 'invert' + '(' + index + '%)';
  },
  'phobos': function (index) {
    return 'blur' + '(' + calculateEffectDepth((index / 100), 0, 3) + 'px)';
  },
  'heat': function (index) {
    return 'brightness' + '(' + calculateEffectDepth((index / 100), 1, 3) + ')';
  },
};

commentsCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');

renderUserPhotos(photos);
renderFullSizePhoto(photos[0]);

uploadFilePopupElement.addEventListener('change', uploadFilePopupOpenHandler);

uploadFileCloseElement.addEventListener('click', uploadFilePopupCloseHandler);
// uploadImageFieldElement.value = '';

effectLevelSliderElement.addEventListener('mouseup', effectDepthChangeHandler);

effectChangeHandler(uploadFormElement);
setOriginEffect();

// image zooming

scaleControlSmallerElement.addEventListener('click', scaleControlSmallerClickHandler);
scaleControlBiggerElement.addEventListener('click', scaleControlBiggerClickHandler);

scaleControlValueElement.setAttribute('value', currentScale + '%');

// hashtags

hashtagsInputElement.addEventListener('change', function (evt) {
  validateHashtags(evt.target.value);
});

hashtagsInputElement.addEventListener('focus', function () {
  document.removeEventListener('keydown', uploadFilePopupKeydownHandler);
});

hashtagsInputElement.addEventListener('blur', function () {
  document.addEventListener('keydown', uploadFilePopupKeydownHandler);
});

// -----------------------------------------------------------------

/* for (var i = 0; i < effectRadioElements.length; i++) {
  effectChangeHandler(effectRadioElements[i]);
} */

/* var effectChangeHandler = function (evt) {
  if (evt.target.value === 'none') {
    getOrigin();
  } else {
    getEffect(evt);
  }
}; */

// editImageFormElement.addEventListener('click', effectChangeHandler);
/* var effectInputElement = uploadImageFieldElement.querySelectorAll('.effects__radio');

for (var i = 0; i < effectInputElement.length; i++) {
  effectInputElement[i].addEventListener('change', function () {
    effectChangeHandler();
  });
}
*/

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
