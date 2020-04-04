const profileRouter = require('express').Router();
const profileController = require('../controllers/profile');

profileRouter.get('/', profileController.getProfile);

module.exports = profileRouter;
