'use strict';

(function () {
  var COMMENTS_COUNT_MIN = 0;
  var COMMENTS_COUNT_MAX = 50;

  var createPhotoElement = function (photo, index) {
    var photoElement = photoTemplateElement.cloneNode(true);
    var imageElement = photoElement.querySelector('.picture__img');

    imageElement.setAttribute('data-index', index);
    imageElement.src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length + window.util.generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
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

  var photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  window.photo = {
    renderPhotos: renderPhotos
  };
})();
