'use strict';

(function () {
  var NO_EFFECT = 'none';

  var Effects = {
    'none': function () {
      return '';
    },
    'chrome': function (value) {
      return 'grayscale' + '(' + (value / 100) + ')';
    },
    'sepia': function (value) {
      return 'sepia' + '(' + (value / 100) + ')';
    },
    'marvin': function (value) {
      return 'invert' + '(' + value + '%)';
    },
    'phobos': function (value) {
      return 'blur' + '(' + calculateEffectDepth((value / 100), 0, 3) + 'px)';
    },
    'heat': function (value) {
      return 'brightness' + '(' + calculateEffectDepth((value / 100), 1, 3) + ')';
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
    uploadImagePreviewElement.style.filter = Effects[effect](effectLevelValueElement.value);
    effectLevelFieldsetElement.style.display = 'block';
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var effectLevelFieldsetElement = document.querySelector('.effect-level');
  var effectLevelSliderElement = effectLevelFieldsetElement.querySelector('.effect-level__pin');
  var effectLevelValueElement = effectLevelFieldsetElement.querySelector('.effect-level__value');
  var effectLevelLineElement = effectLevelFieldsetElement.querySelector('.effect-level__line');
  var effectLevelDepthElement = effectLevelFieldsetElement.querySelector('.effect-level__depth');
  var uploadImagePreviewElement = document.querySelector('.img-upload__preview');

  var effectDepthChangeHandler = function () {
    var computedEffectDepth = Math.round((effectLevelDepthElement.clientWidth * 100) / effectLevelLineElement.clientWidth);
    effectLevelValueElement.value = computedEffectDepth;
  };

  var effectChangeHandler = function (evt) {
    var element = evt.target;
    var isEffectElement = element.getAttribute('name') === 'effect' && element.tagName === 'INPUT';
    if (!isEffectElement) {
      return;
    }

    var effectName = element.getAttribute('id').split('-')[1];

    if (effectName === NO_EFFECT) {
      resetImageEffect();
    } else {
      setImageEffect(effectName);
    }
  };

  uploadFormElement.addEventListener('change', effectChangeHandler);
  resetImageEffect();

  window.formEffect = {
    activate: function () {
      effectLevelSliderElement.addEventListener('mouseup', effectDepthChangeHandler);
    },
    deactivate: function () {
      effectLevelSliderElement.removeEventListener('mouseup', effectDepthChangeHandler);
      resetImageEffect();
    }
  };
})();
