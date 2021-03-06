'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var METHOD_POST = 'POST';
  var METHOD_GET = 'GET';
  var TIMEOUT_IN_MS = 5000;

  var Status = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var ErrorMessage = {
    BAD_REQUEST: 'Ошибка {status}: Неправильный запрос на сервер',
    NOT_FOUND: 'Ошибка {status}: Страница не найдена',
    INTERNAL_SERVER: 'Ошибка {status}: Внутренняя ошибка сервера',
    DEFAULT: 'Ошибка {status}: Повторите попытку позже',
    BAD_CONNECTION: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за {timeout} мс'
  };

  var requestServerData = function (url, method, data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.OK:
          successHandler(xhr.response);
          break;
        case Status.BAD_REQUEST:
          errorHandler(ErrorMessage.BAD_REQUEST.replace('{status}', xhr.status));
          break;
        case Status.NOT_FOUND:
          errorHandler(ErrorMessage.NOT_FOUND.replace('{status}', xhr.status));
          break;
        case Status.INTERNAL_SERVER_ERROR:
          errorHandler(ErrorMessage.INTERNAL_SERVER.replace('{status}', xhr.status));
          break;
        default:
          errorHandler(ErrorMessage.DEFAULT.replace('{status}', xhr.status));
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(ErrorMessage.BAD_CONNECTION);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(ErrorMessage.DEFAULT.replace('{timeout}', xhr.timeout));
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (successHandler, errorHandler) {
      requestServerData(URL_LOAD, METHOD_GET, null, successHandler, errorHandler);
    },
    upload: function (data, successHandler, errorHandler) {
      requestServerData(URL_UPLOAD, METHOD_POST, data, successHandler, errorHandler);
    },
  };
})();
