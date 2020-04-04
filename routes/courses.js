const coursesRouter = require('express').Router();
const coursesController = require('../controllers/courses');

coursesRouter.get('/', coursesController.getCourses);

module.exports = coursesRouter;
