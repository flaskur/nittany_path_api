const db = require('../database'); // should probably use pool instead of connection

const getFaculty = function(request, response, next) {
	const email = request.email; // isAuth does this for us.

	db.execute(
		`
    select professors.name, professors.teaching, courses.course_name, courses.course_description, courses.late_drop_deadline
    from professors join courses on (professors.teaching = courses.course_id)
    where professors.email = ?;
    `,
		[ email ],
		(error, result) => {
			if (error) throw error;

			// I expect a single object here, not an array.
			response.json(result[0]);
		}
	);
};

const getFacultyHomeworkAssignments = function(request, response, next) {
	const { course, section } = request.params;

	db.execute(
		`
		select * from homeworks
		where homeworks.course_id = ? and homeworks.sec_no = ?
		`,
		[ course, section ],
		(error, result) => {
			if (error) throw error;
			response.json(result);
		}
	);
};
const postFacultyHomeworkAssignments = function(request, response, next) {
	const { course, section } = request.params;
	const { homeworkNumber, homeworkDetails } = request.body;

	db.execute(
		`
		insert into homeworks (course_id, sec_no, hw_no, hw_details)
		values (?, ?, ?, ?)
		`,
		[ course, section, homeworkNumber, homeworkDetails ],
		(error) => {
			if (error) throw error;
			response.json({ message: 'post homework success' });
		}
	);
};

const getFacultyExamAssignments = function(request, response, next) {
	const { course, section } = request.params;

	db.execute(
		`
		select * from exams
		where exams.course_id = ? and exams.sec_no = ?
		`,
		[ course, section ],
		(error, result) => {
			if (error) throw error;
			response.json(result);
		}
	);
};
const postFacultyExamAssignments = function(request, response, next) {
	const { course, section } = request.params;
	const { examNumber, examDetails } = request.body;

	db.execute(
		`
		insert into exams (course_id, sec_no, exam_no, exam_details)
		values (?, ?, ?, ?)
		`,
		[ course, section, examNumber, examDetails ],
		(error) => {
			if (error) throw error;
			response.json({ message: 'post exam success' });
		}
	);
};

const getFacultyHomeworkMax = function(request, response, next) {
	const { course, section } = request.params;

	db.execute(
		`
		select max(homeworks.hw_no) as homework_max from homeworks
		where homeworks.course_id = ? and homeworks.sec_no = ?
		`,
		[ course, section ],
		(error, result) => {
			if (error) throw error;
			response.json(result[0]); // I expect an object but I don't know the name.
		}
	);
};
const getFacultyExamMax = function(request, response, next) {
	const { course, section } = request.params;

	db.execute(
		`
		select max(exams.exam_no) as exam_max from exams
		where exams.course_id = ? and exams.sec_no = ?
		`,
		[ course, section ],
		(error, result) => {
			if (error) throw error;
			response.json(result[0]);
		}
	);
};

module.exports = {
	getFaculty,
	getFacultyHomeworkAssignments,
	postFacultyHomeworkAssignments,
	getFacultyExamAssignments,
	postFacultyExamAssignments,
	getFacultyHomeworkMax,
	getFacultyExamMax
};
