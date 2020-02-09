'use strict';

(function () {

  var SCALE_VALUE_STEP = 25;
  var SCALE_VALUE_MAX = 100;
  var SCALE_VALUE_MIN = 25;
  var SCALE_VALUE_DEFAULT = 100;

  var setImageScale = function (scale) {
    uploadImagePreviewElement.style.transform = 'scale(' + (scale / SCALE_VALUE_MAX) + ')';
    scaleControlValueElement.setAttribute('value', scale + '%');
    currentScale = scale;
  };

  var resetImageScale = function () {
    uploadImagePreviewElement.style.transform = 'scale(' + (SCALE_VALUE_DEFAULT / SCALE_VALUE_MAX) + ')';
    scaleControlValueElement.setAttribute('value', SCALE_VALUE_DEFAULT + '%');
    currentScale = SCALE_VALUE_DEFAULT;
  };

  var uploadImagePreviewElement = document.querySelector('.img-upload__preview');
  var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
  var scaleControlValueElement = document.querySelector('.scale__control--value');

  var currentScale = SCALE_VALUE_DEFAULT;

  var scaleControlSmallerClickHandler = function () {
    var previousScaleValue = currentScale - SCALE_VALUE_STEP;
    var normalizedNextScale = Math.max(previousScaleValue, SCALE_VALUE_MIN);

    setImageScale(normalizedNextScale);
  };

  var scaleControlBiggerClickHandler = function () {
    var nextScaleValue = currentScale + SCALE_VALUE_STEP;
    var normalizedNextScale = Math.min(nextScaleValue, SCALE_VALUE_MAX);

    setImageScale(normalizedNextScale);
  };

  scaleControlValueElement.setAttribute('value', currentScale + '%');

  window.formScale = {
    activate: function () {
      scaleControlSmallerElement.addEventListener('click', scaleControlSmallerClickHandler);
      scaleControlBiggerElement.addEventListener('click', scaleControlBiggerClickHandler);
    },
    deactivate: function () {
      scaleControlSmallerElement.removeEventListener('click', scaleControlSmallerClickHandler);
      scaleControlBiggerElement.removeEventListener('click', scaleControlBiggerClickHandler);
      resetImageScale();
    }
  };
})();
