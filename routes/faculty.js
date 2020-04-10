const facultyRouter = require('express').Router();
const facultyController = require('../controllers/faculty');
const isAuth = require('../middleware/isAuth');

facultyRouter.get('/', isAuth, facultyController.getFaculty);

facultyRouter.get('/:course/:section/assignments/homeworks', isAuth, facultyController.getFacultyHomeworkAssignments);
facultyRouter.post('/:course/:section/assignments/homeworks', isAuth, facultyController.postFacultyHomeworkAssignments);

facultyRouter.get('/:course/:section/assignments/exams', isAuth, facultyController.getFacultyExamAssignments);
facultyRouter.post('/:course/:section/assignments/exams', isAuth, facultyController.postFacultyExamAssignments);

facultyRouter.get('/:course/:section/assignments/homework_max', isAuth, facultyController.getFacultyHomeworkMax);
facultyRouter.get('/:course/:section/assignments/exam_max', isAuth, facultyController.getFacultyExamMax);

facultyRouter.get('/:course/:section/grades/:type/:number', isAuth, facultyController.getGrades);
facultyRouter.patch('/:course/:section/grades/:type/:number', isAuth, facultyController.patchGrades);

module.exports = facultyRouter;
