'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;

  var Filters = {
    DEFAULT: function (photos) {
      return photos.slice();
    },
    RANDOM: function (photos) {
      return shufflePhotos(photos.slice()).slice(0, RANDOM_PHOTOS_COUNT);
    },
    DISCUSSED: function (photos) {
      return photos.slice().sort(function (firstPhoto, secondPhoto) {
        return secondPhoto.comments.length - firstPhoto.comments.length;
      });
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

    var filterName = element.getAttribute('id').split('-')[1].toUpperCase();

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

  window.filter = {
    activate: function (filterSelectCallback) {
      selectCallback = filterSelectCallback;

      filtersElement.classList.remove('img-filters--inactive');

      filtersElement.addEventListener('click', filtersClickHandler);
    },
    deactivate: function () {
      selectCallback = null;

      filtersElement.removeEventListener('click', filtersClickHandler);
    }
  };
})();
