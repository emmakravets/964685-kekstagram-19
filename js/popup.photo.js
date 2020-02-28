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

  var showedComments = 0;

  var loadComments = function (comments) {
    var nextComments = showedComments + MAX_SHOWED_COMMENTS;
    if (comments.length > nextComments) {
      for (var i = showedComments; i < nextComments; i++) {
        comments[i].style.display = 'flex';
      }
      showedComments = nextComments;
      showedCommentsCountElement.textContent = showedComments;
    } else {
      for (i = showedComments; i < comments.length; i++) {
        comments[i].style.display = 'flex';
      }
      showedComments = comments.length;
      showedCommentsCountElement.textContent = comments.length;
      commentsLoader.classList.add('hidden');
    }
  };

  var resetComments = function () {
    showedComments = 0;
    clearCommentsElement();
    commentsLoader.classList.remove('hidden');
  };

  var renderCommentsElement = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      fragment.appendChild(createCommentElement(comment));
    });
    commentsElement.appendChild(fragment);

    uploadedComments = document.querySelectorAll('.social__comment');
    loadComments(uploadedComments);
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
    commentsLoader.addEventListener('click', commentsLoadClickHandler);

    document.addEventListener('keydown', documentKeydownHandler);
  };

  var closePopup = function () {
    document.body.classList.remove('modal-open');

    photoElement.classList.add('hidden');
    photoCloseElement.removeEventListener('click', popupCloseClickHandler);
    commentsLoader.removeEventListener('click', commentsLoadClickHandler);

    document.removeEventListener('keydown', documentKeydownHandler);
    resetComments();
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
    loadComments(uploadedComments);
  };

  var photoElement = document.querySelector('.big-picture');
  var photoCloseElement = document.querySelector('.big-picture__cancel');
  var commentsElement = document.querySelector('.social__comments');
  var commentsTemplateElement = document.querySelector('.social__comment');
  var showedCommentsCountElement = document.querySelector('.social__comment-showed');
  var commentsLoader = document.querySelector('.comments-loader');
  var uploadedComments;

  window.popupPhoto = {
    open: openPopup,
    close: closePopup
  };
})();
