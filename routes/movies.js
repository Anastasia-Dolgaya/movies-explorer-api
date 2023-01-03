const router = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const { validateNewMovie, validateMovieID } = require('../middlewares/celebrate');

router.get('/', getMovies);
router.post('/', validateNewMovie, createMovie);
router.delete('/:movieId', validateMovieID, deleteMovie);

module.exports = router;
