const facultyRouter = require('express').Router();
const facultyController = require('../controllers/faculty');
const isAuth = require('../middleware/isAuth');

facultyRouter.get('/', isAuth, facultyController.getFaculty);

module.exports = facultyRouter;
