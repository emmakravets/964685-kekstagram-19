'use strict';

(function () {
  var USER_NAMES = ['Евкакий', 'Повсекакий', 'Мафусаил', 'Ефросинья', 'Евдокия', 'Ротибор'];

  var COMMENTS_LIMIT = 10;
  var COMMENTS_MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var USER_PHOTO_LIMIT = 25;

  var PHOTO_DESCRIPTION = 'Описание фотографии';
  var PHOTO_URL_TEMPLATE = 'photos/{index}.jpg';

  var LIKES_COUNT_MIN = 15;
  var LIKES_COUNT_MAX = 200;

  var AVATAR_URL_TEMPLATE = 'img/avatar-{index}.svg';

  var generateRandomNumber = function (from, to) {
    return Math.round(Math.random() * (to - from) + from);
  };

  var generateRandomComment = function () {
    return {
      avatar: AVATAR_URL_TEMPLATE.replace('{index}', generateRandomNumber(1, 6)),
      message: window.util.getRandomItem(COMMENTS_MESSAGES),
      name: window.util.getRandomItem(USER_NAMES)
    };
  };

  var generateRandomComments = function () {
    var comments = [];
    var limit = generateRandomNumber(0, COMMENTS_LIMIT);
    for (var i = 0; i < limit; i++) {
      comments.push(generateRandomComment());
    }
    return comments;
  };

  window.generate = {
    generateRandomComments: generateRandomComments,
    generateRandomUserPhotos: function () {
      var photos = [];
      for (var i = 0; i < USER_PHOTO_LIMIT; i++) {
        photos.push({
          url: PHOTO_URL_TEMPLATE.replace('{index}', i + 1),
          description: PHOTO_DESCRIPTION,
          likes: generateRandomNumber(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
          comments: generateRandomComments()
        });
      }
      return photos;
    }
  };
})();
