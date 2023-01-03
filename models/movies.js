const mongoose = require('mongoose');
const { regexp } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexp.test(v),
      message: (props) => `${props.value} не является валидной ссылкой!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexp.test(v),
      message: (props) => `${props.value} не является валидной ссылкой!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexp.test(v),
      message: (props) => `${props.value} не является валидной ссылкой!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
