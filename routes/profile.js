const profileRouter = require('express').Router();
const profileController = require('../controllers/profile');
const isAuth = require('../middleware/isAuth');

profileRouter.get('/:role', isAuth, profileController.getProfile);

module.exports = profileRouter;
