'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setPreviewPhoto = function (src) {
    previewPhotoElements.forEach(function (photo) {
      photo.style.backgroundImage = 'url(' + src + ')';
    });
  };

  var changePhotoHandler = function () {
    var file = photoUploadElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (match) {
      return fileName.endsWith(match);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        defaultPhotoElement.src = reader.result;
        setPreviewPhoto(reader.result);
      });

      reader.readAsDataURL(file);
    } else {
      errorChangeCallback();
    }
  };

  var photoUploadElement = document.querySelector('.img-upload__input');
  var defaultPhotoElement = document.querySelector('.img-upload__preview img');
  var previewPhotoElements = document.querySelectorAll('.effects__preview');
  var errorChangeCallback;

  window.formPhoto = {
    activate: function (changePhotoErrorCallback) {
      errorChangeCallback = changePhotoErrorCallback;
      photoUploadElement.addEventListener('change', changePhotoHandler);
    },
    deactivate: function () {
      errorChangeCallback = null;
      photoUploadElement.removeEventListener('change', changePhotoHandler);
    }
  };
})();
