const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { AuthError } = require('../errors/AuthError');
const { LOGIN_ERROR_MESSAGE } = require('../errors/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        if (!validator.isEmail(v)) {
          return false;
        }
        return v;
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(LOGIN_ERROR_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(LOGIN_ERROR_MESSAGE));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
