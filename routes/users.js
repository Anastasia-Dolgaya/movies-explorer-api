const router = require('express').Router();

const {
  getMyInfo, updateUser,
} = require('../controllers/users');

const { validateUserUpdate } = require('../middlewares/celebrate');

router.get('/me', getMyInfo);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
