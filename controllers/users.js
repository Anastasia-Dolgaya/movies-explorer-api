require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { ValidationError } = require('../errors/ValidationError');

module.exports.getMyInfo = async (req, res, next) => {
  try {
    const user = await User.findOne(req.user)
      // 404
      .orFail(new NotFoundError('Пользователь не найден.'));
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      // 400
      next(new BadRequestError('Передан некорректный id пользователя.'));
    } else {
      next(err);
    }
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email, password: hash, name,
    });

    user.password = undefined;

    res.send({
      user,
    });
  } catch (err) {
    if (err.code === 11000) {
      // 409
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else if (err.name === 'ValidationError') {
      // 400
      next(new ValidationError('Введены невалидные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .json({ message: 'Вход выполнен' })
        .end();
    })
    .catch(next);
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(req.user, { name, about }, {
      new: true,
      runValidators: true,
    })
      // 404
      .orFail(new NotFoundError('Пользователь не найден.'));

    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt')
      .send({ message: 'Выход' });
  } catch (err) {
    next(err);
  }
};
