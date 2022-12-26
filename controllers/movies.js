const Movie = require('../models/movies');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const {
  VALIDATION_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  FORBIDDEN_MESSAGE,
  MOVIE_BAD_REQUEST_MESSAGE,
} = require('../errors/errors');

const { DELETE_MOVIE_MESSAGE } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => movies.filter((movie) => movie.owner._id.toString() === req.user._id))
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: { _id: req.user._id } });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      // 400
      next(new ValidationError(VALIDATION_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
      .orFail(new NotFoundError(NOT_FOUND_MOVIE_MESSAGE));

    if (movie.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError(FORBIDDEN_MESSAGE);
    }

    await movie.delete();
    res.send({ message: DELETE_MOVIE_MESSAGE });
  } catch (err) {
    if (err.name === 'CastError') {
      // 400
      next(new BadRequestError(MOVIE_BAD_REQUEST_MESSAGE));
    } else {
      next(err);
    }
  }
};
