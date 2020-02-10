'use strict';

var COMMENTS_COUNT_MIN = 0;
var COMMENTS_COUNT_MAX = 50;

var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;

var AVATAR_WIDTH = '35';
var AVATAR_HEIGHT = '35';

var KEY_ESC = 'Escape';
var KEY_ENTER = 'Enter';

var generateRandomNumber = function (from, to) {
  return Math.round(Math.random() * (to - from) + from);
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
  renderCommentsElement(window.generate.generateRandomComments());
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

var uploadFilePopupHandler = function () {
  window.popup.open();
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

var photos = window.generate.generateRandomUserPhotos();

var picturesElement = document.querySelector('.pictures');

var commentsElement = document.querySelector('.social__comments');
var commentsTemplateElement = document.querySelector('.social__comment');
var fullSizePhotoElement = document.querySelector('.big-picture');
var fullSizePhotoCloseElement = document.querySelector('.big-picture__cancel');
var commentsCountElement = document.querySelector('.social__comment-count');
var commentsLoaderElement = document.querySelector('.comments-loader');
// var uploadFormElement = document.querySelector('.img-upload__form');
var uploadImageFieldElement = document.querySelector('.img-upload');
var uploadFilePopupElement = uploadImageFieldElement.querySelector('#upload-file');

commentsCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');

window.photo.renderPhotos(photos);

uploadFilePopupElement.addEventListener('change', uploadFilePopupHandler);

picturesElement.addEventListener('click', picturesClickHandler);
picturesElement.addEventListener('keydown', picturesKeydownHandler);
