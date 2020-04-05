const coursesRouter = require('express').Router();
const coursesController = require('../controllers/courses');
const isAuth = require('../middleware/isAuth');

coursesRouter.get('/', isAuth, coursesController.getCourses);

module.exports = coursesRouter;
