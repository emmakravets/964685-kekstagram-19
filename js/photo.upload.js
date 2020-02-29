'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var changePhotoHandler = function () {
    var file = photoUploadElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (match) {
      return fileName.endsWith(match);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        defaulPhotoElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      errorChangeCallback();
    }
  };

  var photoUploadElement = document.querySelector('.img-upload__input');
  var defaulPhotoElement = document.querySelector('.img-upload__preview img');
  var errorChangeCallback;

  window.photoUpload = {
    activate: function (changePhotoErrorCallback) {
      errorChangeCallback = changePhotoErrorCallback;
      photoUploadElement.addEventListener('change', changePhotoHandler);
    },
    deactivate: function () {
      photoUploadElement.removeEventListener('change', changePhotoHandler);
    }
  };
})();
