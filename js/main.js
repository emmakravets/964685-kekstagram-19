'use strict';

var KEY_ENTER = 'Enter';

var uploadFilePopupHandler = function () {
  window.popup.open();
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

  var index = imageElement.getAttribute('data-index');
  window.popupPhoto.open(photos[index]);
};

var picturesClickHandler = function (evt) {
  var imageElement = evt.target;
  var isFullSizeImage = imageElement.getAttribute('class') === 'picture__img' && imageElement.tagName === 'IMG';
  if (!isFullSizeImage) {
    return;
  }

  evt.preventDefault();

  var index = imageElement.getAttribute('data-index');
  window.photoPopup.open(photos[index]);
};

var photos = window.generate.generateRandomPhotos();

var picturesElement = document.querySelector('.pictures');
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
