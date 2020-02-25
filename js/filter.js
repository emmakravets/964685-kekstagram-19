'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;

  var Filters = {
    default: function (photos) {
      var defaultPhotos = photos.slice();
      photoSelectCallback(defaultPhotos);
      return defaultPhotos;
    },
    random: function (photos) {
      var randomPhotos = photos.slice();
      photoSelectCallback(randomPhotos);
      return shufflePhotos(randomPhotos).slice(0, RANDOM_PHOTOS_COUNT);
    },
    discussed: function (photos) {
      var discussedPhotos = photos.slice();
      photoSelectCallback(discussedPhotos);
      discussedPhotos.sort(function (min, max) {
        var difference = max.comments.length - min.comments.length;
        if (difference === 0) {
          difference = max.likes - min.likes;
        }
        return difference;
      });
      return discussedPhotos;
    }
  };

  var shufflePhotos = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.round(Math.random() * (i + 1));
      var temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  var filtersClickHandler = function (evt) {
    var element = evt.target;

    if (!element.classList.contains('img-filters__button')) {
      return;
    }

    var filterName = element.getAttribute('id').split('-')[1];

    currentFilterElement.classList.remove('img-filters__button--active');
    element.classList.add('img-filters__button--active');
    currentFilterElement = element;

    if (typeof selectCallback === 'function') {
      if (typeof Filters[filterName] !== undefined) {
        selectCallback(Filters[filterName]);
      }
    }
  };

  var filtersElement = document.querySelector('.img-filters');
  var currentFilterElement = document.querySelector('.img-filters__button--active');
  var selectCallback;
  var photoSelectCallback;

  window.filter = {
    activate: function (filterSelectCallback, photoSelectAfterFilterCallback) {
      selectCallback = filterSelectCallback;
      photoSelectCallback = photoSelectAfterFilterCallback;

      filtersElement.classList.remove('img-filters--inactive');

      filtersElement.addEventListener('click', filtersClickHandler);
    },
    deactivate: function () {
      selectCallback = null;
      photoSelectCallback = null;

      filtersElement.removeEventListener('click', filtersClickHandler);
    }
  };
})();
