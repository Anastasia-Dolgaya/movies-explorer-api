const BAD_REQUEST_CODE = 400;
const AUTH_ERROR_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const SERVER_ERROR_CODE = 500;
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';
const BAD_REQUEST_MESSAGE = 'Введены некорректные данные.';
const MOVIE_BAD_REQUEST_MESSAGE = 'Передан некорректный id фильма.';
const USER_BAD_REQUEST_MESSAGE = 'Передан некорректный id пользователя.';
const NOT_FOUND_MESSAGE = 'Страница не найдена';
const NOT_FOUND_MOVIE_MESSAGE = 'Фильм не найден.';
const NOT_FOUND_USER_MESSAGE = 'Пользователь не найден.';
const AUTH_ERROR_MESSAGE = 'Необходима авторизация';
const LOGIN_ERROR_MESSAGE = 'Неправильные почта или пароль';
const VALIDATION_ERROR_MESSAGE = 'Переданы невалидные данные';
const FORBIDDEN_MESSAGE = 'Пользователь не имеет прав на удаление чужого фильма.';
const CONFLICT_MESSAGE = 'Пользователь с таким email уже существует.';

module.exports = {
  BAD_REQUEST_CODE,
  AUTH_ERROR_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST_MESSAGE,
  MOVIE_BAD_REQUEST_MESSAGE,
  USER_BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  AUTH_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  FORBIDDEN_MESSAGE,
  CONFLICT_MESSAGE,
};
