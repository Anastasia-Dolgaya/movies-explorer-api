const jwt = require('jsonwebtoken');

const { AuthError } = require('../errors/AuthError');

const { AUTH_ERROR_MESSAGE } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthError(AUTH_ERROR_MESSAGE);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
