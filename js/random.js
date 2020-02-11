'use strict';

(function () {
  var generateRandomNumber = function (from, to) {
    return Math.round(Math.random() * (to - from) + from);
  };

  var getRandomItem = function (items) {
    return items[generateRandomNumber(0, items.length - 1)];
  };

  window.random = {
    generateRandomNumber: generateRandomNumber,
    getRandomItem: getRandomItem
  };
})();
