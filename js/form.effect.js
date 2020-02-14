'use strict';

(function () {
  var NO_EFFECT = 'none';
  var EFFECT_DEFAULT_PERCENT = 0;

  var EFFECT_PHOBOS_MIN = 0;
  var EFFECT_PHOBOS_MAX = 3;

  var EFFECT_HEAT_MIN = 1;
  var EFFECT_HEAT_MAX = 3;

  var PERCENT_MAX = 100;

  var Effects = {
    'none': function () {
      return '';
    },
    'chrome': function (value) {
      return 'grayscale' + '(' + (value / PERCENT_MAX) + ')';
    },
    'sepia': function (value) {
      return 'sepia' + '(' + (value / PERCENT_MAX) + ')';
    },
    'marvin': function (value) {
      return 'invert' + '(' + value + '%)';
    },
    'phobos': function (value) {
      return 'blur' + '(' + calculateEffectDepth((value / PERCENT_MAX), EFFECT_PHOBOS_MIN, EFFECT_PHOBOS_MAX) + 'px)';
    },
    'heat': function (value) {
      return 'brightness' + '(' + calculateEffectDepth((value / PERCENT_MAX), EFFECT_HEAT_MIN, EFFECT_HEAT_MAX) + ')';
    }
  };

  var calculateEffectDepth = function (percent, from, to) {
    return (to - from) * percent + from;
  };

  var resetImageEffect = function () {
    uploadImagePreviewElement.style.filter = '';
    effectLevelFieldsetElement.style.display = 'none';
  };

  var setImageEffect = function (effect) {
    uploadImagePreviewElement.style.filter = Effects[effect](EFFECT_DEFAULT_PERCENT);
    effectLevelFieldsetElement.style.display = 'block';
    effectLevelPinElement.style.left = 0;
    effectLevelDepthElement.style.width = 0;
  };

  var effectLevelChangeHandler = function (evt) {
    var element = evt.target;
    var isEffectElement = element.getAttribute('name') === 'effect' && element.tagName === 'INPUT';
    if (!isEffectElement) {
      return;
    }

    var effectName = element.getAttribute('id').split('-')[1];
    effectValue = effectName;

    if (effectName === NO_EFFECT) {
      resetImageEffect();
    } else {
      setImageEffect(effectName);
      uploadImageElement.classList.add('effects__preview--' + effectName);
      uploadImageElement.style.filter = Effects[effectName](EFFECT_DEFAULT_PERCENT);
    }
  };

  var effectLevelPinMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoord = evt.clientX;

    var effectLevelPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;

      var shiftLeft = (effectLevelPinElement.offsetLeft - shift);

      if (shiftLeft < 0) {
        shiftLeft = 0;
      } else if (shiftLeft > effectLevelLineElement.clientWidth) {
        shiftLeft = effectLevelLineElement.clientWidth;
      }

      effectLevelPinElement.style.left = shiftLeft + 'px';
      effectLevelDepthElement.style.width = shiftLeft + 'px';

      effectLevelValueElement.value = Math.round(shiftLeft / (effectLevelLineElement.clientWidth / PERCENT_MAX));
      effectLevelValueElement.setAttribute('value', effectLevelValueElement.value);
      uploadImagePreviewElement.style.filter = Effects[effectValue](effectLevelValueElement.value);
    };

    var effectLevelPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', effectLevelPinMouseMoveHandler);
      document.removeEventListener('mouseup', effectLevelPinMouseUpHandler);
    };

    document.addEventListener('mousemove', effectLevelPinMouseMoveHandler);
    document.addEventListener('mouseup', effectLevelPinMouseUpHandler);
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var effectLevelFieldsetElement = document.querySelector('.effect-level');
  var effectLevelPinElement = effectLevelFieldsetElement.querySelector('.effect-level__pin');
  var effectLevelValueElement = effectLevelFieldsetElement.querySelector('.effect-level__value');
  var effectLevelLineElement = effectLevelFieldsetElement.querySelector('.effect-level__line');
  var effectLevelDepthElement = effectLevelFieldsetElement.querySelector('.effect-level__depth');
  var uploadImagePreviewElement = document.querySelector('.img-upload__preview');
  var uploadImageElement = uploadImagePreviewElement.querySelector('img');
  var effectValue;

  resetImageEffect();

  window.formEffect = {
    activate: function () {
      effectLevelPinElement.addEventListener('mousedown', effectLevelPinMouseDownHandler);
      uploadFormElement.addEventListener('change', effectLevelChangeHandler);
    },
    deactivate: function () {
      effectLevelPinElement.removeEventListener('mousedown', effectLevelPinMouseDownHandler);
      uploadFormElement.removeEventListener('change', effectLevelChangeHandler);
      resetImageEffect();
    }
  };
})();
