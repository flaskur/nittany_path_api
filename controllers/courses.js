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

const getPosts = function(request, response, next) {
	const { course } = request.params;

	db.execute(
		`
		select * from posts
		where posts.course_id = ?
		`,
		[ course ],
		(error, result) => {
			if (error) throw error;
			response.json(result);
		}
	);
};

const postPosts = function(request, response, next) {
	const { course } = request.params;
	const email = request.email;
	const { postInfo } = request.body;

	db.execute(
		`
		insert into posts (course_id, post_no, student_email, post_info)
		values (?, ?, ?, ?)
		`,
		[ course, '', email, postInfo ],
		(error) => {
			if (error) throw error;
			response.json({ message: 'successfully made a forum post' });
		}
	);
};

const getDeadline = function(request, response, next) {
	const { course } = request.params;

	db.execute(
		`
		select courses.late_drop_deadline from courses
		where courses.course_id = ?
		`,
		[ course ],
		(error, result) => {
			if (error) throw error;
			response.json(result[0]);
		}
	);
};

const deleteCourse = function(request, response, next) {
	const { course, section } = request.params;
	const email = request.email;

	// Our job is to remove this course from this person's enrollment, and remove any posts that they posted on this particular course.
	db.execute(
		`
		delete from enrolls
		where enrolls.student_email = ? and enrolls.course_id = ? and enrolls.sec_no = ?
		`,
		[ email, course, section ],
		(error) => {
			if (error) throw error;
		}
	);

	db.execute(
		`
		delete from posts
		where posts.course_id = ? and posts.student_email = ?
		`,
		[ course, email ],
		(error) => {
			if (error) throw error;
		}
	);

	response.json({ message: 'successfully deleted the course + posts' });
};

module.exports = {
	getCourses,
	getAssignments,
	getGrades,
	getPosts,
	postPosts,
	getDeadline,
	deleteCourse
};
