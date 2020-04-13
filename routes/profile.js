const profileRouter = require('express').Router();
const profileController = require('../controllers/profile');
const isAuth = require('../middleware/isAuth');

profileRouter.get('/:role', isAuth, profileController.getProfile);

profileRouter.patch('/', isAuth, profileController.resetPassword);

module.exports = profileRouter;
