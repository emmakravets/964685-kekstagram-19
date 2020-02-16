'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT_IN_MS = 5000;

  var Status = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var ErrorMessage = {
    BAD_REQUEST: ': Неправильный запрос на сервер',
    NOT_FOUND: ': Страница не найдена',
    INTERNAL_SERVER: ': Внутренняя ошибка сервера',
    DEFAULT: ' Повторите попытку позже',
    BAD_CONNECTION: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за '
  };

  var getData = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.OK:
          successHandler(xhr.response);
          break;
        case Status.BAD_REQUEST:
          errorHandler('Ошибка ' + xhr.status + ErrorMessage.BAD_REQUEST);
          break;
        case Status.NOT_FOUND:
          errorHandler('Ошибка ' + xhr.status + ErrorMessage.NOT_FOUND);
          break;
        case Status.INTERNAL_SERVER_ERROR:
          errorHandler('Ошибка ' + xhr.status + ErrorMessage.INTERNAL_SERVER);
          break;
        default:
          errorHandler('Ошибка ' + xhr.status + ErrorMessage.DEFAULT);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(ErrorMessage.BAD_CONNECTION);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(ErrorMessage.TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: getData
  };
})();
