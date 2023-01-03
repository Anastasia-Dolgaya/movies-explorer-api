const { NotFoundError } = require('../errors/NotFoundError');
const { NOT_FOUND_MESSAGE } = require('../errors/errors');

const notFoundController = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
};

module.exports = { notFoundController };
