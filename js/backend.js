'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var Status = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var getDataFromServer = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Status.OK:
          successHandler(xhr.response);
          break;
        case Status.BAD_REQUEST:
          errorHandler('Ошибка ' + xhr.status + ': Неправильный запрос на сервер');
          break;
        case Status.NOT_FOUND:
          errorHandler('Ошибка ' + xhr.status + ': Страница не найдена');
          break;
        case Status.INTERNAL_SERVER_ERROR:
          errorHandler('Ошибка ' + xhr.status + ': Внутренняя ошибка сервера');
          break;
        default:
          errorHandler('Произошла ошибка' + xhr.status + 'Повторите попытку позже');
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: getDataFromServer
  };
})();
