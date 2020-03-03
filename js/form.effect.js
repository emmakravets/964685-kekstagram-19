'use strict';

(function () {
  var NO_EFFECT = 'none';
  var EFFECT_DEFAULT_PERCENT = 0;
  var EFFECT_MAX_PERCENT = 100;

  var EFFECT_PHOBOS = {
    MIN: 0,
    MAX: 3
  };

  var EFFECT_HEAT = {
    MIN: 1,
    MAX: 3
  };

  var Effects = {
    NONE: function () {
      return '';
    },
    CHROME: function (value) {
      return 'grayscale' + '(' + (value / EFFECT_MAX_PERCENT) + ')';
    },
    SEPIA: function (value) {
      return 'sepia' + '(' + (value / EFFECT_MAX_PERCENT) + ')';
    },
    MARVIN: function (value) {
      return 'invert' + '(' + value + '%)';
    },
    PHOBOS: function (value) {
      return 'blur' + '(' + calculateEffectDepth((value / EFFECT_MAX_PERCENT), EFFECT_PHOBOS.MIN, EFFECT_PHOBOS.MAX) + 'px)';
    },
    HEAT: function (value) {
      return 'brightness' + '(' + calculateEffectDepth((value / EFFECT_MAX_PERCENT), EFFECT_HEAT.MIN, EFFECT_HEAT.MAX) + ')';
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

    var effectName = element.getAttribute('id').split('-')[1].toUpperCase();
    effectValue = effectName;

    if (effectName === NO_EFFECT) {
      resetImageEffect();
    } else {
      setImageEffect(effectName);
      uploadImageElement.setAttribute('class', 'effects__preview--' + effectName.toLowerCase());
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

      effectLevelValueElement.value = Math.round(shiftLeft / (effectLevelLineElement.clientWidth / EFFECT_MAX_PERCENT));
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
