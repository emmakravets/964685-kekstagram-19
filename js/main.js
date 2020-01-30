'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USER_NAMES = ['Евкакий', 'Повсекакий', 'Мафусаил', 'Ефросинья', 'Евдокия', 'Ротибор'];
var COMMENTS_LIMIT = 6;
var COMMENTS_COUNT_MIN = 0;
var COMMENTS_COUNT_MAX = 50;
var USER_PHOTOS_LIMIT = 25;
var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;

var generateRandomNumber = function (from, to) {
  return Math.round(Math.random() * (to - from) + from);
};

var getRandomItem = function (items) {
  return items[generateRandomNumber(0, items.length - 1)];
};

var generateRandomComment = function () {
  return {
    avatar: 'img/avatar-' + generateRandomNumber(1, 6) + '.svg',
    message: getRandomItem(MESSAGES),
    name: getRandomItem(USER_NAMES)
  };
};

var generateRandomComments = function () {
  var comments = [];
  for (var i = 0; i < COMMENTS_LIMIT; i++) {
    comments.push(generateRandomComment());
  }
  return comments;
};

var generateRandomUserPhotos = function () {
  var randomUserPhotos = [];
  for (var i = 0; i < USER_PHOTOS_LIMIT; i++) {
    randomUserPhotos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: generateRandomNumber(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
      comments: generateRandomComments()
    });
  }
  return randomUserPhotos;
};

var createUserPhotoElement = function (userPhoto) {
  var userPhotoElement = userPhotoTemplateElement.cloneNode(true);

  userPhotoElement.querySelector('.picture__img').src = userPhoto.url;
  userPhotoElement.querySelector('.picture__comments').textContent = userPhoto.comments.length + generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  userPhotoElement.querySelector('.picture__likes').textContent = userPhoto.likes;

  return userPhotoElement;
};

var renderUserPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createUserPhotoElement(photos[i]));
  }
  picturesElement.appendChild(fragment);
};

var createComment = function (comment) {
  var commentElement = commentsTemplateElement.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__picture').width = '35';
  commentElement.querySelector('.social__picture').height = '35';
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var renderComments = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(createComment(comments[i]));
  }
  commentsElement.appendChild(fragment);
};

var renderFullSizePhoto = function (fullSizePhotoIndex) {
  fullSizePhotoElement.querySelector('img').src = photos[fullSizePhotoIndex].url;
  fullSizePhotoElement.querySelector('.likes-count').textContent = photos[fullSizePhotoIndex].likes;
  fullSizePhotoElement.querySelector('.comments-count').textContent = photos[fullSizePhotoIndex].comments.length + generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  fullSizePhotoElement.querySelector('.social__caption').textContent = photos[fullSizePhotoIndex].description;
  var userComments = generateRandomComments();
  renderComments(userComments);
};

var hideItem = function (blockName) {
  document.querySelector(blockName).classList.add('hidden');
};

var photos = generateRandomUserPhotos();

var userPhotoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');
var commentsElement = document.querySelector('.social__comments');
var commentsTemplateElement = document.querySelector('.social__comment');

renderUserPhotos(photos);

var fullSizePhotoElement = document.querySelector('.big-picture');
fullSizePhotoElement.classList.remove('hidden');

renderFullSizePhoto(0);

hideItem('.social__comment-count');
hideItem('.comments-loader');
document.body.classList.add('modal-open');
