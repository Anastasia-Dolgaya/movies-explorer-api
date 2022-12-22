const Movie = require('../models/movies');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: { _id: req.user._id },
    });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      // 400
      next(new ValidationError('Переданы невалидные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
      .orFail(new NotFoundError('Фильм не найден.'));

    if (movie.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError('Пользователь не имеет прав на удаления чужого фильма.');
    }

    await movie.delete();
    res.send({ message: 'Фильм удален.' });
  } catch (err) {
    if (err.name === 'CastError') {
      // 400
      next(new BadRequestError('Передан некорректный id фильма.'));
    } else {
      next(err);
    }
  }
};
