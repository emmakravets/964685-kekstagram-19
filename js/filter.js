'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;

  var toggleFilterClass = function (button) {
    currentButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
    currentButton = button;
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

  var sortByRandomPhotos = function (photos) {
    return shufflePhotos(photos).splice(RANDOM_PHOTOS_COUNT);
  };

  var sortByDiscussedPhotos = function (photos) {
    photos.sort(function (min, max) {
      var difference = max.comments.length - min.comments.length;
      if (difference === 0) {
        difference = max.likes - min.likes;
      }
      return difference;
    });
  };

  var clearDefaultPhotos = function () {
    var picturesElement = document.querySelectorAll('.picture');
    picturesElement.forEach(function (photo) {
      photo.remove();
    });
  };

  var changeFilter = function (photos) {
    var newPhotosArray = photos.slice();

    clearDefaultPhotos();

    switch (currentButton) {
      case randomButtonElement:
        sortByRandomPhotos(newPhotosArray);
        break;
      case discussedButtonElement:
        sortByDiscussedPhotos(newPhotosArray);
        break;
    }
    window.photos.render(newPhotosArray);
  };

  /* if (typeof toggleFilterCallback === 'function') {
    toggleFilterCallback();
  } */

  /* var handler = function (btn) {
    toggleFilterClass(btn);
    window.debounce(changeFilter(toggleFilterCallback()));
  }; */

  var imageFiltersElement = document.querySelector('.img-filters');
  var filterButtonsElement = document.querySelectorAll('.img-filters__button');
  var randomButtonElement = document.querySelector('#filter-random');
  var discussedButtonElement = document.querySelector('#filter-discussed');
  var currentButton = document.querySelector('.img-filters__button--active');
  // var toggleFilterCallback;

  window.filter = {
    activate: function (filterSelectCallback) {
      // toggleFilterCallback = filterSelectCallback;

      filterButtonsElement.forEach(function (btn) {
        btn.addEventListener('click', function () {
          toggleFilterClass(btn);
          window.debounce(changeFilter(filterSelectCallback()));
        });
      });
    },
    show: function () {
      imageFiltersElement.classList.remove('img-filters--inactive');
    }
  };
})();
