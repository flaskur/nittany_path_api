const db = require('../database');

const getCourses = function(request, response, next) {
	// We need to authenticate the jwt token. That should be handled by the isAuth middleware.
	const email = request.email; // extracted from token by isAuth middleware

	db.execute(
		`
		select enrolls.student_email, enrolls.sec_no, courses.course_id, courses.course_name, courses.course_description, courses.late_drop_deadline, professors.email, professors.name, professors.office_address
		from enrolls join courses on (enrolls.course_id = courses.course_id)
  	join professors on (courses.course_id = professors.teaching)
		where enrolls.student_email = ?
		`,
		[ email ],
		(error, result) => {
			if (error) throw error;

			response.json(result);
		}
	);
};

const getAssignments = function(request, response, next) {
	const { course, section, type } = request.params;

	if (type === 'homeworks') {
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
	} else if (type === 'exams') {
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
	}
};

const getGrades = function(request, response, next) {
	const email = request.email;
	const { course, section, type } = request.params;

	if (type === 'homework_grades') {
		db.execute(
			`
			select * from homework_grades
			where homework_grades.student_email = ? and homework_grades.course_id = ? and homework_grades.sec_no = ?
			`,
			[ email, course, section ],
			(error, result) => {
				if (error) throw error;
				response.json(result);
			}
		);
	} else if (type === 'exam_grades') {
		db.execute(
			`
			select * from exam_grades
			where exam_grades.student_email = ? and exam_grades.course_id = ? and exam_grades.sec_no = ?
			`,
			[ email, course, section ],
			(error, result) => {
				if (error) throw error;
				response.json(result);
			}
		);
	}
};

module.exports = {
	getCourses,
	getAssignments,
	getGrades
};
