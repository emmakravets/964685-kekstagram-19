'use strict';

var SCALE_VALUE_STEP = 25;
var SCALE_VALUE_MAX = 100;
var SCALE_VALUE_MIN = 25;
var SCALE_VALUE_DEFAULT = 100;

var setImageScale = function (scale) {
  uploadImagePreviewElement.style.transform = 'scale(' + (scale / SCALE_VALUE_MAX) + ')';
  // scaleControlValueElement.value = scale + '%';
  scaleControlValueElement.setAttribute('value', scale + '%');
  currentScale = scale;
};

var scaleControlSmallerClickHandler = function () {
  var nextScaleValue = currentScale - SCALE_VALUE_STEP;
  if (nextScaleValue >= SCALE_VALUE_MIN) {
    setImageScale(nextScaleValue);
  }
};

var scaleControlBiggerClickHandler = function () {
  var nextScaleValue = currentScale + SCALE_VALUE_STEP;
  if (nextScaleValue <= SCALE_VALUE_MAX) {
    setImageScale(nextScaleValue);
  }
};

var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
var scaleControlValueElement = document.querySelector('.scale__control--value');
var uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
var currentScale = SCALE_VALUE_DEFAULT;

scaleControlSmallerElement.addEventListener('click', scaleControlSmallerClickHandler);
scaleControlBiggerElement.addEventListener('click', scaleControlBiggerClickHandler);

scaleControlValueElement.setAttribute('value', currentScale + '%');

