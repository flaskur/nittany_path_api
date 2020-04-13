const coursesRouter = require('express').Router();
const coursesController = require('../controllers/courses');
const isAuth = require('../middleware/isAuth');

coursesRouter.get('/', isAuth, coursesController.getCourses);

coursesRouter.get('/:course/:section/assignments/:type', isAuth, coursesController.getAssignments);

coursesRouter.get('/:course/:section/grades/:type', isAuth, coursesController.getGrades);

coursesRouter.get('/:course/:section/forum', isAuth, coursesController.getPosts);
coursesRouter.post('/:course/:section/forum', isAuth, coursesController.postPosts);

coursesRouter.get('/:course/:section/late_drop_deadline', isAuth, coursesController.getDeadline);

coursesRouter.delete('/:course/:section', isAuth, coursesController.deleteCourse);

module.exports = coursesRouter;
