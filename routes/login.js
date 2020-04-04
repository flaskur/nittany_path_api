const loginRouter = require('express').Router();
const loginController = require('../controllers/login');

loginRouter.post('/', loginController.postLogin);

module.exports = loginRouter;
