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
  }
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
  var photos = [];
  for (var i = 0; i < USER_PHOTO_LIMIT; i++) {
    photos.push({
      url: PHOTO_URL_TEMPLATE.replace('{index}', i + 1),
      description: PHOTO_DESCRIPTION,
      likes: generateRandomNumber(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
      comments: generateRandomComments()
    });
  }
  return photos;
};

var createPhotoElement = function (photo, index) {
  var photoElement = photoTemplateElement.cloneNode(true);
  var imageElement = photoElement.querySelector('.picture__img');

  imageElement.setAttribute('data-index', index);
  imageElement.src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length + generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotoElement(photos[i], i));
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

var setImageEffect = function (effect) {
  uploadImagePreviewElement.style.filter = Effects[effect](effectLevelValueElement.value);
  effectLevelFieldsetElement.style.display = 'block';
};

var setImageScale = function (scale) {
  uploadImagePreviewElement.style.transform = 'scale(' + (scale / SCALE_VALUE_MAX) + ')';
  scaleControlValueElement.setAttribute('value', scale + '%');
  currentScale = scale;
};

var resetImageScale = function () {
  uploadImagePreviewElement.style.transform = 'scale(' + (SCALE_VALUE_DEFAULT / SCALE_VALUE_MAX) + ')';
  scaleControlValueElement.setAttribute('value', SCALE_VALUE_DEFAULT + '%');
  currentScale = SCALE_VALUE_DEFAULT;
};

var hashtagsFocusHandler = function () {
  document.removeEventListener('keydown', documentKeydownEscPopupHandler);
};

var hashtagsBlurHandler = function () {
  document.addEventListener('keydown', documentKeydownEscPopupHandler);

};

var openPopup = function () {
  editImageFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadPopupCloseElement.addEventListener('click', uploadPopupCloseHandler);
  document.addEventListener('keydown', documentKeydownEscPopupHandler);

  effectLevelSliderElement.addEventListener('mouseup', effectDepthChangeHandler);
  scaleControlSmallerElement.addEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBiggerElement.addEventListener('click', scaleControlBiggerClickHandler);

  window.form.activate(hashtagsFocusHandler, hashtagsBlurHandler);
  window.form.comments.activate(commentsFocusHandler, commentsBlurHandler);
};

var closePopup = function () {
  editImageFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFormElement.reset();

  uploadPopupCloseElement.removeEventListener('click', uploadPopupCloseHandler);
  document.removeEventListener('keydown', documentKeydownEscPopupHandler);

  effectLevelSliderElement.removeEventListener('mouseup', effectDepthChangeHandler);
  scaleControlSmallerElement.removeEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBiggerElement.removeEventListener('click', scaleControlBiggerClickHandler);

  window.form.deactivate();
  window.form.comments.deactivate();

  resetImageEffect();
  resetImageScale();
};

var openFullSizeImage = function () {
  fullSizePhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fullSizePhotoCloseElement.addEventListener('click', fullSizeImageCloseHandler);
  document.addEventListener('keydown', documentKeydownEscFullSizeImageHandler);
};

var closeFullSizeImage = function () {
  fullSizePhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  fullSizePhotoCloseElement.removeEventListener('click', fullSizeImageCloseHandler);
  document.removeEventListener('keydown', documentKeydownEscFullSizeImageHandler);
};

var documentKeydownEscPopupHandler = function (evt) {
  if (evt.key === KEY_ESC) {
    closePopup();
  }
};

var uploadFilePopupHandler = function () {
  openPopup();
};

var uploadPopupCloseHandler = function () {
  closePopup();
};

var effectDepthChangeHandler = function () {
  var computedEffectDepth = Math.round((effectLevelDepthElement.clientWidth * 100) / effectLevelLineElement.clientWidth);
  effectLevelValueElement.value = computedEffectDepth;
};

var effectChangeHandler = function (evt) {
  var element = evt.target;
  var isEffectElement = element.getAttribute('name') === 'effect' && element.tagName === 'INPUT';
  if (!isEffectElement) {
    return;
  }

  var effectName = element.getAttribute('id').split('-');

  if (effectName[1] === NO_EFFECT) {
    resetImageEffect();
  } else {
    setImageEffect(effectName[1]);
  }
};

var scaleControlSmallerClickHandler = function () {
  var previousScaleValue = currentScale - SCALE_VALUE_STEP;
  var normalizedNextScale = Math.max(previousScaleValue, SCALE_VALUE_MIN);

  setImageScale(normalizedNextScale);
};

var scaleControlBiggerClickHandler = function () {
  var nextScaleValue = currentScale + SCALE_VALUE_STEP;
  var normalizedNextScale = Math.min(nextScaleValue, SCALE_VALUE_MAX);

  setImageScale(normalizedNextScale);
};

var commentsFocusHandler = function () {
  document.removeEventListener('keydown', documentKeydownEscPopupHandler);
};

var commentsBlurHandler = function () {
  document.addEventListener('keydown', documentKeydownEscPopupHandler);
};

var documentKeydownEscFullSizeImageHandler = function (evt) {
  if (evt.key === KEY_ESC) {
    closeFullSizeImage();
  }
};

var picturesKeydownHandler = function (evt) {
  if (evt.key !== KEY_ENTER) {
    return;
  }

  evt.preventDefault();
  openFullSizeImage();

  var linkElement = evt.target;
  var isFullSizeImage = linkElement.getAttribute('class') === 'picture' && linkElement.tagName === 'A';
  if (!isFullSizeImage) {
    return;
  }

  var imageElement = linkElement.querySelector('img');
  var index = 0;
  renderFullSizePhotoElement(photos[index]);

  fullSizePhotoElement.querySelector('img').src = imageElement.src;
  fullSizePhotoElement.querySelector('.likes-count').textContent = generateRandomNumber(LIKES_COUNT_MIN, LIKES_COUNT_MAX);
};

var picturesClickHandler = function (evt) {
  var imageElement = evt.target;

  var isFullSizeImage = imageElement.getAttribute('class') === 'picture__img' && imageElement.tagName === 'IMG';
  if (!isFullSizeImage) {
    return;
  }

  evt.preventDefault();
  openFullSizeImage();

  var index = imageElement.getAttribute('data-index');
  renderFullSizePhotoElement(photos[index]);

  fullSizePhotoElement.querySelector('img').src = imageElement.src;
  fullSizePhotoElement.querySelector('.likes-count').textContent = generateRandomNumber(LIKES_COUNT_MIN, LIKES_COUNT_MAX);
};

var fullSizeImageCloseHandler = function () {
  closeFullSizeImage();
};

var photos = generateRandomUserPhotos();

var photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');

var commentsElement = document.querySelector('.social__comments');
var commentsTemplateElement = document.querySelector('.social__comment');
var fullSizePhotoElement = document.querySelector('.big-picture');
var fullSizePhotoCloseElement = document.querySelector('.big-picture__cancel');
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

var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
var scaleControlValueElement = document.querySelector('.scale__control--value');

var currentScale = SCALE_VALUE_DEFAULT;

commentsCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');

renderPhotos(photos);

resetImageEffect();
scaleControlValueElement.setAttribute('value', currentScale + '%');

uploadFilePopupElement.addEventListener('change', uploadFilePopupHandler);
uploadFormElement.addEventListener('change', effectChangeHandler);

picturesElement.addEventListener('click', picturesClickHandler);
picturesElement.addEventListener('keydown', picturesKeydownHandler);
