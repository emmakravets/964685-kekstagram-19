'use strict';

(function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;

  var KEY_ESC = 'Escape';
  var MAX_SHOWED_COMMENTS = 5;

  var createCommentElement = function (comment) {
    var commentElement = commentsTemplateElement.cloneNode(true);
    var commentAvatarElement = commentElement.querySelector('.social__picture');

    commentAvatarElement.src = comment.avatar;
    commentAvatarElement.alt = comment.name;
    commentAvatarElement.width = AVATAR_WIDTH;
    commentAvatarElement.height = AVATAR_HEIGHT;

    commentElement.querySelector('.social__text').textContent = comment.message;
    commentElement.style.display = 'none';

    return commentElement;
  };

  var clearCommentsElement = function () {
    commentsElement.innerHTML = '';
  };

  var renderCommentsElement = function (comments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(createCommentElement(comments[i]));
    }
    commentsElement.appendChild(fragment);
    var commentsCollection = document.querySelectorAll('.social__comment');
    showComments(commentsCollection);
  };

  var renderPhoto = function (photo) {
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.likes-count').textContent = photo.likes;
    // photoElement.querySelector('.comments-count').textContent = photo.comments.length;
    photoElement.querySelector('.social__caption').textContent = photo.description;

    clearCommentsElement();
    renderCommentsElement(photo.comments);
  };

  var showedComments = 0;

  var showComments = function (comments) {
    var nextComments = showedComments + MAX_SHOWED_COMMENTS;
    if (comments.length > nextComments) {
      for (var i = showedComments; i < nextComments; i++) {
        comments[i].style.display = 'flex';
      }
      showedComments = nextComments;
      photoElement.querySelector('.social__comment-count').textContent = showedComments + ' из ' + comments.length + ' комментариев';
    } else {
      for (i = showedComments; i < comments.length; i++) {
        comments[i].style.display = 'flex';
      }
      showedComments = comments.length;
      photoElement.querySelector('.social__comment-count').textContent = comments.length + ' из ' + comments.length + ' комментариев';
      commentsLoader.classList.add('hidden');
    }
  };

  var openPopup = function (photo) {
    document.body.classList.add('modal-open');

    renderPhoto(photo);

    photoElement.classList.remove('hidden');
    photoCloseElement.addEventListener('click', popupCloseClickHandler);
    commentsLoader.addEventListener('click', commentsLoadClickHandler);

    document.addEventListener('keydown', documentKeydownHandler);
  };

  var closePopup = function () {
    document.body.classList.remove('modal-open');

    photoElement.classList.add('hidden');
    photoCloseElement.removeEventListener('click', popupCloseClickHandler);
    commentsLoader.removeEventListener('click', commentsLoadClickHandler);

    document.removeEventListener('keydown', documentKeydownHandler);
  };

  var popupCloseClickHandler = function () {
    closePopup();
  };

  var documentKeydownHandler = function (evt) {
    if (evt.key === KEY_ESC) {
      closePopup();
    }
  };

  var commentsLoadClickHandler = function () {
    var commentsCollection = document.querySelectorAll('.social__comment');
    showComments(commentsCollection);
  };

  var photoElement = document.querySelector('.big-picture');
  var photoCloseElement = document.querySelector('.big-picture__cancel');
  var commentsElement = document.querySelector('.social__comments');
  var commentsTemplateElement = document.querySelector('.social__comment');
  var commentsLoader = document.querySelector('.comments-loader');

  window.popupPhoto = {
    open: openPopup,
    close: closePopup
  };
})();
