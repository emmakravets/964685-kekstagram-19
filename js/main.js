'use strict';

var USER_NAMES = ['Евкакий', 'Повсекакий', 'Мафусаил', 'Ефросинья', 'Евдокия', 'Ротибор'];
var USER_PHOTO_LIMIT = 25;

var COMMENTS_LIMIT = 10;
var COMMENTS_COUNT_MIN = 0;
var COMMENTS_COUNT_MAX = 50;
var COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTO_DESCRIPTION = 'Описание фотографии';
var PHOTO_URL_TEMPLATE = 'photos/{index}.jpg';

var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;

var AVATAR_WIDTH = '35';
var AVATAR_HEIGHT = '35';
var AVATAR_URL_TEMPLATE = 'img/avatar-{index}.svg';

var KEY_ESC = 'Escape';
var KEY_ENTER = 'Enter';

var NO_EFFECT = 'none';

var SCALE_VALUE_STEP = 25;
var SCALE_VALUE_MAX = 100;
var SCALE_VALUE_MIN = 25;
var SCALE_VALUE_DEFAULT = 100;

var HASHTAG_SYMBOL = '#';
var HASHTAG_LENGTH_LIMIT = 20;
var HASHTAG_HASH_LIMIT = 1;

var HASHTAGS_SEPARATOR = ' ';
var HASHTAGS_COUNT_LIMIT = 5;

var Effects = {
  'none': function () {
    return '';
  },
  'chrome': function (value) {
    return 'grayscale' + '(' + (value / 100) + ')';
  },
  'sepia': function (value) {
    return 'sepia' + '(' + (value / 100) + ')';
  },
  'marvin': function (value) {
    return 'invert' + '(' + value + '%)';
  },
  'phobos': function (value) {
    return 'blur' + '(' + calculateEffectDepth((value / 100), 0, 3) + 'px)';
  },
  'heat': function (value) {
    return 'brightness' + '(' + calculateEffectDepth((value / 100), 1, 3) + ')';
  },
};

var generateRandomNumber = function (from, to) {
  return Math.round(Math.random() * (to - from) + from);
};

var getRandomItem = function (items) {
  return items[generateRandomNumber(0, items.length - 1)];
};

var generateRandomComment = function () {
  return {
    avatar: AVATAR_URL_TEMPLATE.replace('{index}', generateRandomNumber(1, 6)),
    message: getRandomItem(COMMENTS_MESSAGES),
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

var createCommentElement = function (comment) {
  var commentElement = commentsTemplateElement.cloneNode(true);
  var commentAvatarElement = commentElement.querySelector('.social__picture');

  commentAvatarElement.src = comment.avatar;
  commentAvatarElement.alt = comment.name;
  commentAvatarElement.width = AVATAR_WIDTH;
  commentAvatarElement.height = AVATAR_HEIGHT;

  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var clearCommentsElement = function () {
  commentsElement.innerHTML = '';
};

var renderCommentsElement = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(createCommentElement(comments[i]));
  }
  commentsElement.appendChild(fragment);
};

var renderFullSizePhotoElement = function (photo) {
  fullSizePhotoElement.querySelector('img').src = photo.url;
  fullSizePhotoElement.querySelector('.likes-count').textContent = photo.likes;
  fullSizePhotoElement.querySelector('.comments-count').textContent = photo.comments.length + generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  fullSizePhotoElement.querySelector('.social__caption').textContent = photo.description;

  clearCommentsElement();
  renderCommentsElement(generateRandomComments());
};

var calculateEffectDepth = function (percent, from, to) {
  return (to - from) * percent + from;
};

var resetImageEffect = function () {
  uploadImagePreviewElement.style.filter = '';
  effectLevelFieldsetElement.style.display = 'none';
};

var setImageEffect = function (evt) {
  uploadImagePreviewElement.style.filter = Effects[evt.target.value](effectLevelValueElement.value);
  effectLevelFieldsetElement.style.display = 'block';
};

// @TODO
var setImageScale = function (scale) {
  uploadImagePreviewElement.style.transform = 'scale(' + (scale / SCALE_VALUE_MAX) + ')';
  // scaleControlValueElement.value = scale + '%';
  scaleControlValueElement.setAttribute('value', scale + '%');
  currentScale = scale;
};

var validateHashtag = function (tag) {
  if (tag[0] !== HASHTAG_SYMBOL) {
    return 'Хэштег должен начинаться с # (решётка)'; // @TODO: extract
  }
  if (tag === HASHTAG_SYMBOL) {
    return 'Хэштег не может состоять только из одной решётки'; // @TODO: extract
  }
  if (tag.length > HASHTAG_LENGTH_LIMIT) {
    return 'Хэштег не должен превышать ' + HASHTAG_LENGTH_LIMIT + ' символов'; // @TODO: extract
  }
  if (!/^#[a-zA-Z0-9]+/.test(tag)) {
    return 'строка после решётки должна состоять из букв и чисел';// @TODO: extract
  }

  if (tag.split(HASHTAG_SYMBOL).length - 1 > HASHTAG_HASH_LIMIT) {
    return 'Хэштеги должны разделяться пробелами'; // @TODO: extract
  }
  return '';
};

var validateHashtags = function (value) {
  var hashtags = value.split(HASHTAGS_SEPARATOR);
  var validationMessage;

  if (hashtags.length > HASHTAGS_COUNT_LIMIT) {
    return 'Нельзя указать больше пяти хэштегов';
  }

  if (hashtags.some(function (searchHashtag, seachIndex) {
    return hashtags.some(function (hashtag, index) {
      return hashtag === searchHashtag && seachIndex !== index;
    });
  })) {
    return 'Один и тот же хэштег не может быть использован дважды';
  }

  for (var i = 0; i < hashtags.length; i++) {
    validationMessage = validateHashtag(hashtags[i]);
    if (!validationMessage) {
      return validationMessage;
    }
  }

  return validationMessage;
};

var hashtagsInputChangeHandler = function (evt) {
  hashtagsInputElement.setCustomValidity(validateHashtags(evt.target.value));
};

var openPopup = function () {
  editImageFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  scaleControlSmallerElement.addEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBiggerElement.addEventListener('click', scaleControlBiggerClickHandler);
  hashtagsInputElement.addEventListener('change', hashtagsInputChangeHandler);

  /// @TODO
  document.addEventListener('keydown', uploadFilePopupKeydownHandler);

  hashtagsInputElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', uploadFilePopupKeydownHandler);
  });

  hashtagsInputElement.addEventListener('blur', function Name () {
    document.addEventListener('keydown', uploadFilePopupKeydownHandler);
  });
};

var closePopup = function () {
  editImageFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFormElement.reset();

  document.removeEventListener('keydown', uploadFilePopupKeydownHandler);

  scaleControlSmallerElement.removeEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBiggerElement.removeEventListener('click', scaleControlBiggerClickHandler);

  hashtagsInputElement.removeEventListener('change', hashtagsInputChangeHandler);

  /// @TODO
};

var uploadFilePopupKeydownHandler = function (evt) {
  if (evt.key === KEY_ENTER) {
    openClose();
  }
  if (evt.key === KEY_ESC) {
    closePopup();
  }
};

var uploadFilePopupOpenHandler = function () {
  openPopup();
};

var uploadFilePopupCloseHandler = function () {
  closePopup();
};

var effectDepthChangeHandler = function () {
  var computedEffectDepth = Math.round((effectLevelDepthElement.clientWidth * 100) / effectLevelLineElement.clientWidth);
  effectLevelValueElement.value = computedEffectDepth;
};

var effectChangeHandler = function (evt) {
  if (evt.target.value === NO_EFFECT) {
    resetImageEffect();
  } else {
    setImageEffect(evt);
  }
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
var uploadPopupCloseElement = uploadImageFieldElement.querySelector('#upload-cancel');
var editImageFormElement = uploadImageFieldElement.querySelector('.img-upload__overlay');

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
var hashtagsInputElement = document.querySelector('.text__hashtags');

var currentScale = SCALE_VALUE_DEFAULT;

commentsCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');

renderUserPhotos(photos);
renderFullSizePhotoElement(photos[0]);


// uploadImageFieldElement.value = '';



resetImageEffect();

uploadFilePopupElement.addEventListener('change', uploadFilePopupHandler);
uploadFormElement.addEventListener('change', effectChangeHandler);


uploadPopupCloseElement.addEventListener('click', uploadPopupCloseHandler); // @TODO add listener when popun is shown
effectLevelSliderElement.addEventListener('mouseup', effectDepthChangeHandler); // @TODO add listener when popun is shown

// image zooming

scaleControlValueElement.setAttribute('value', currentScale + '%');

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
