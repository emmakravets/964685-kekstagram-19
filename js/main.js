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

var NONE_EFFECT = 'none';

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

var uploadFilePopupKeydownEscapeHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    uploadFilePopupCloseHandler();
  }
};

var uploadFilePopupKeydownEnterHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    uploadFilePopupOpenHandler();
  }
};

var uploadFilePopupOpenHandler = function () {
  editImageFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', uploadFilePopupKeydownEscapeHandler);
  document.addEventListener('keydown', uploadFilePopupKeydownEnterHandler);
};

var uploadFilePopupCloseHandler = function () {
  editImageFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', uploadFilePopupKeydownEscapeHandler);
  uploadFormElement.reset();
};

var effectDepthChangeHandler = function () {
  var effectComputedDepth = Math.round((effectLevelDepthElement.clientWidth * 100) / effectLevelLineElement.clientWidth);
  effectLevelValueElement.value = effectComputedDepth;
};

var getOriginEffect = function () {
  uploadImagePreviewElement.style.filter = '';
  effectLevelFieldsetElement.style.display = 'none';
};


var getEffect = function (evt) {
  uploadImagePreviewElement.style.filter = effects[evt.target.value]();
  effectLevelFieldsetElement.style.display = 'block';
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
// var effectElements = uploadImageFieldElement.querySelectorAll('.effects__preview');
var effectRadioElements = uploadImageFieldElement.querySelectorAll('.effects__radio');

var effects = {
  'none': function () {
    return '';
  },
  'chrome': function () {
    return 'grayscale' + '(' + (effectLevelValueElement.value / 100) + ')';
  },
  'sepia': function () {
    return 'sepia' + '(' + (effectLevelValueElement.value / 100) + ')';
  },
  'marvin': function () {
    return 'invert' + '(' + (effectLevelValueElement.value) + ')';
  },
  'phobos': function () {
    return 'blur' + '(' + (effectLevelValueElement.value / 100) + 'px)';
  },
  'heat': function () {
    return 'brightness' + '(' + (effectLevelValueElement.value / 100) + ')';
  },
};

commentsCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');
// fullSizePhotoElement.classList.remove('hidden');

// document.body.classList.add('modal-open');
renderUserPhotos(photos);
renderFullSizePhoto(photos[0]);

uploadFilePopupElement.addEventListener('change', uploadFilePopupOpenHandler);

uploadFileCloseElement.addEventListener('click', function () {
  uploadFilePopupCloseHandler();
  // uploadImageFieldElement.value = '';
});

effectLevelSliderElement.addEventListener('mouseup', effectDepthChangeHandler);

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
} */

var effectChangeHandler = function (element) {
  element.addEventListener('change', function (evt) {
    if (evt.target.value === NONE_EFFECT) {
      getOriginEffect();
    } else {
      getEffect(evt);
    }
  });
};

for (var i = 0; i < effectRadioElements.length; i++) {
  effectChangeHandler(effectRadioElements[i]);
}

getOriginEffect();
