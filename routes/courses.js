const coursesRouter = require('express').Router();
const coursesController = require('../controllers/courses');
const isAuth = require('../middleware/isAuth');

coursesRouter.get('/', isAuth, coursesController.getCourses);

coursesRouter.get('/:course/:section/assignments/:type', isAuth, coursesController.getAssignments);

module.exports = coursesRouter;
