'use strict';

(function () {
  var KEY_ENTER = 'Enter';

  var createPhotoElement = function (photo, index) {
    var photoElement = photoTemplateElement.cloneNode(true);
    var imageElement = photoElement.querySelector('.picture__img');

    imageElement.setAttribute('data-index', index);
    imageElement.src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
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

  var clearPhotos = function () {
    var pictureElement = document.querySelectorAll('.picture');
    pictureElement.forEach(function (photo) {
      photo.remove();
    });
  };

  var picturesKeydownHandler = function (evt) {
    if (evt.key !== KEY_ENTER) {
      return;
    }

    var linkElement = evt.target;
    var isFullSizeImage = linkElement.getAttribute('class') === 'picture' && linkElement.tagName === 'A';
    if (!isFullSizeImage) {
      return;
    }

    evt.preventDefault();

    var imageElement = linkElement.querySelector('img');
    var index = imageElement.getAttribute('data-index');

    if (typeof photoSelectCallback === 'function') {
      photoSelectCallback(index);
    }
  };

  var picturesClickHandler = function (evt) {
    var imageElement = evt.target;
    var isFullSizeImage = imageElement.getAttribute('class') === 'picture__img' && imageElement.tagName === 'IMG';
    if (!isFullSizeImage) {
      return;
    }

    evt.preventDefault();

    var index = imageElement.getAttribute('data-index');

    if (typeof photoSelectCallback === 'function') {
      photoSelectCallback(index);
    }
  };

  var photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  var photoSelectCallback;

  window.photos = {
    activate: function (selectCallback) {
      photoSelectCallback = selectCallback;

      picturesElement.addEventListener('click', picturesClickHandler);
      picturesElement.addEventListener('keydown', picturesKeydownHandler);
    },
    deactive: function () {
      photoSelectCallback = null;

      picturesElement.removeEventListener('click', picturesClickHandler);
      picturesElement.removeEventListener('keydown', picturesKeydownHandler);
    },
    render: renderPhotos,
    clear: clearPhotos
  };
})();
