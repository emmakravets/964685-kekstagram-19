'use strict';

(function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;

  var KEY_ESC = 'Escape';

  var createCommentElement = function (comment) {
    var commentElement = commentsTemplateElement.cloneNode(true);
    var commentAvatarElement = commentElement.querySelector('.social__picture');

    commentAvatarElement.src = comment.avatar;
    commentAvatarElement.alt = comment.name;
    commentAvatarElement.width = AVATAR_WIDTH;
    commentAvatarElement.height = AVATAR_HEIGHT;

    commentElement.querySelector('.social__text').textContent = comment.message;

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
  };

  var renderPhoto = function (photo) {
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.likes-count').textContent = photo.likes;
    photoElement.querySelector('.comments-count').textContent = photo.comments.length;
    photoElement.querySelector('.social__caption').textContent = photo.description;

    clearCommentsElement();
    renderCommentsElement(photo.comments);
  };

  var openPopup = function (photo) {
    document.body.classList.add('modal-open');

    renderPhoto(photo);

    photoElement.classList.remove('hidden');
    photoCloseElement.addEventListener('click', popupCloseClickHandler);

    document.addEventListener('keydown', documentKeydownHandler);
  };

  var closePopup = function () {
    document.body.classList.remove('modal-open');

    photoElement.classList.add('hidden');
    photoCloseElement.removeEventListener('click', popupCloseClickHandler);

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

  var photoElement = document.querySelector('.big-picture');
  var photoCloseElement = document.querySelector('.big-picture__cancel');
  var commentsElement = document.querySelector('.social__comments');
  var commentsTemplateElement = document.querySelector('.social__comment');

  window.popupPhoto = {
    open: openPopup,
    close: closePopup
  };
})();
