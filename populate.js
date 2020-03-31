console.log('hello world');

const csv = require('csv-parser');
const fs = require('fs');
const db = require('./database');
const results = [ 'ender' ];

fs.createReadStream('./csv/Professors.csv').pipe(csv()).on('data', (data) => {
	let name = data.Name;
	let email = data.Email;
	let password = data.Password;
	let age = data.Age;
	let gender = data.Gender;
	let department = data.Department;
	let office = data.Office;
	let departmentName = data['Department Name'];
	let title = data.Title;
	let teachingTeamId = data['Teaching Team ID'];
	let teaching = data.Teaching;

	db.execute(
		`
		  INSERT IGNORE INTO professors (email, password, name, age, gender, office_address, department, title)
		  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`,
		[ email, password, name, age, gender, office, department, title ]
	);

	db.execute(
		`
		  INSERT IGNORE INTO prof_teaching_teams (prof_email, teaching_team_id)
		  VALUES (?, ?)
		`,
		[ email, teachingTeamId ]
	);

	if (title === 'Head') {
		db.execute(
			`
		    INSERT IGNORE INTO departments (dept_id, dept_name, dept_head)
		    VALUES (?, ?, ?)
		  `,
			[ department, departmentName, name ]
		);
	}
});

fs.createReadStream('./csv/Students_TA.csv').pipe(csv()).on('data', (data) => {
	let fullName = data['Full Name'];
	let email = data.Email;
	let age = data.Age;
	let zip = data.Zip;
	let phone = data.Phone;
	let gender = data.Gender;
	let city = data.City;
	let state = data.State;
	let password = data.Password;
	let street = data.Street;
	let major = data.Major;
	let courseOne = data['Courses 1'];
	let courseOneName = data['Course 1 Name'];
	let courseOneDetails = data['Course 1 Details'];
	let courseOneSection = data['Course 1 Section'];
	let courseOneSectionLimit = data['Course 1 Section Limit'];
	let courseOneHomeworkNo = data['Course 1 HW_No'];
	let courseOneHomeworkDetails = data['Course 1 HW_Details'];
	let courseOneHomeworkGrade = data['Course 1 HW_Grade'];
	let courseOneExamNo = data['Course 1 EXAM_No'];
	let courseOneExamDetails = data['Course 1 Exam_Details'];
	let courseOneExamGrade = data['Course 1 EXAM_Grade'];
	let courseTwo = data['Courses 2'];
	let courseTwoName = data['Course 2 Name'];
	let courseTwoDetails = data['Course 2 Details'];
	let courseTwoSection = data['Course 2 Section'];
	let courseTwoSectionLimit = data['Course 2 Section Limit'];
	let courseTwoHomeworkNo = data['Course 2 HW_No'];
	let courseTwoHomeworkDetails = data['Course 2 HW_Details'];
	let courseTwoHomeworkGrade = data['Course 2 HW_Grade'];
	let courseTwoExamNo = data['Course 2 EXAM_No'];
	let courseTwoExamDetails = data['Course 2 Exam_Details'];
	let courseTwoExamGrade = data['Course 2 EXAM_Grade'];
	let courseThree = data['Courses 3'];
	let courseThreeName = data['Course 3 Name'];
	let courseThreeDetails = data['Course 3 Details'];
	let courseThreeSection = data['Course 3 Section'];
	let courseThreeSectionLimit = data['Course 3 Section Limit'];
	let courseThreeHomeworkNo = data['Course 3 HW_No'];
	let courseThreeHomeworkDetails = data['Course 3 HW_Details'];
	let courseThreeHomeworkGrade = data['Course 3 HW_Grade'];
	let courseThreeExamNo = data['Course 3 EXAM_No'];
	let courseThreeExamDetails = data['Course 3 Exam_Details'];
	let courseThreeExamGrade = data['Course 3 EXAM_Grade'];
	let teachingTeamId = data['Teaching Team ID'];

	// STUDENTS
	db.execute(
		`
			INSERT IGNORE INTO students (email, password, name, age, gender, major, street, zipcode)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`,
		[ email, password, fullName, age, gender, major, street, zip ]
	);

	// ZIPCODES
	db.execute(
		`
			INSERT IGNORE INTO zipcodes (zipcode, city, state)
			VALUES (?, ?, ?)
		`,
		[ zip, city, state ]
	);

	// COURSES
	db.execute(
		`
			INSERT IGNORE INTO courses (course_id, course_name, course_description, late_drop_deadline)
			VALUES (?, ?, ?, ?)
			`,
		[ courseOne, courseOneName, courseOneDetails, 'January 1st, 2021' ]
	);
	db.execute(
		`
			INSERT IGNORE INTO courses (course_id, course_name, course_description, late_drop_deadline)
			VALUES (?, ?, ?, ?)
			`,
		[ courseTwo, courseTwoName, courseTwoDetails, 'January 1st, 2021' ]
	);
	db.execute(
		`
			INSERT IGNORE INTO courses (course_id, course_name, course_description, late_drop_deadline)
			VALUES (?, ?, ?, ?)
			`,
		[ courseThree, courseThreeName, courseThreeDetails, 'January 1st, 2021' ]
	);

	// SECTIONS
	db.execute(
		`
		INSERT IGNORE INTO sections (course_id, sec_no, class_limit, teaching_team_id)
		VALUES (?, ?, ?, ?)
		`,
		[ courseOne, courseOneSection, courseOneSectionLimit, teachingTeamId ]
	);
	db.execute(
		`
		INSERT IGNORE INTO sections (course_id, sec_no, class_limit, teaching_team_id)
		VALUES (?, ?, ?, ?)
		`,
		[ courseTwo, courseTwoSection, courseTwoSectionLimit, teachingTeamId ]
	);
	db.execute(
		`
		INSERT IGNORE INTO sections (course_id, sec_no, class_limit, teaching_team_id)
		VALUES (?, ?, ?, ?)
		`,
		[ courseThree, courseThreeSection, courseThreeSectionLimit, teachingTeamId ]
	);

	// ENROLLS
	db.execute(
		`
		INSERT IGNORE INTO enrolls (student_email, course_id, sec_no)
		VALUES (?, ?, ?)
		`,
		[ email, courseOne, courseOneSection ]
	);
	db.execute(
		`
		INSERT IGNORE INTO enrolls (student_email, course_id, sec_no)
		VALUES (?, ?, ?)
		`,
		[ email, courseTwo, courseTwoSection ]
	);
	db.execute(
		`
		INSERT IGNORE INTO enrolls (student_email, course_id, sec_no)
		VALUES (?, ?, ?)
		`,
		[ email, courseThree, courseThreeSection ]
	);

	// TA_TEACHING_TEAMS
	db.execute(
		`
		INSERT IGNORE INTO ta_teaching_teams (student_email, teaching_team_id)
		VALUES (?, ?)
		`,
		[ email, teachingTeamId ]
	);

	// HOMEWORKS
	db.execute(
		`
		INSERT IGNORE INTO homeworks (course_id, sec_no, hw_no, hw_details)
		VALUES (?, ?, ?, ?)
		`,
		[ courseOne, courseOneSection, courseOneHomeworkNo, courseOneHomeworkDetails ]
	);
	db.execute(
		`
		INSERT IGNORE INTO homeworks (course_id, sec_no, hw_no, hw_details)
		VALUES (?, ?, ?, ?)
		`,
		[ courseTwo, courseTwoSection, courseTwoHomeworkNo, courseTwoHomeworkDetails ]
	);
	db.execute(
		`
		INSERT IGNORE INTO homeworks (course_id, sec_no, hw_no, hw_details)
		VALUES (?, ?, ?, ?)
		`,
		[ courseThree, courseThreeSection, courseThreeHomeworkNo, courseThreeHomeworkDetails ]
	);

	// HOMEWORK_GRADES
	db.execute(
		`
		INSERT IGNORE INTO homework_grades (student_email, course_id, sec_no, hw_no, grade)
		VALUES (?, ?, ?, ?, ?)
		`,
		[ email, courseOne, courseOneSection, courseOneHomeworkNo, courseOneHomeworkGrade ]
	);
	db.execute(
		`
		INSERT IGNORE INTO homework_grades (student_email, course_id, sec_no, hw_no, grade)
		VALUES (?, ?, ?, ?, ?)
		`,
		[ email, courseTwo, courseTwoSection, courseTwoHomeworkNo, courseTwoHomeworkGrade ]
	);
	db.execute(
		`
		INSERT IGNORE INTO homework_grades (student_email, course_id, sec_no, hw_no, grade)
		VALUES (?, ?, ?, ?, ?)
		`,
		[ email, courseThree, courseThreeSection, courseThreeHomeworkNo, courseThreeHomeworkGrade ]
	);

	// EXAMS
	db.execute(
		`
		INSERT IGNORE INTO exams (course_id, sec_no, exam_no, exam_details)
		VALUES (?, ?, ?, ?)
		`,
		[ courseOne, courseOneSection, courseOneExamNo, courseOneExamDetails ]
	);
	db.execute(
		`
		INSERT IGNORE INTO exams (course_id, sec_no, exam_no, exam_details)
		VALUES (?, ?, ?, ?)
		`,
		[ courseTwo, courseTwoSection, courseTwoExamNo, courseTwoExamDetails ]
	);
	db.execute(
		`
		INSERT IGNORE INTO exams (course_id, sec_no, exam_no, exam_details)
		VALUES (?, ?, ?, ?)
		`,
		[ courseThree, courseThreeSection, courseThreeExamNo, courseThreeExamDetails ]
	);

	// EXAM_GRADES
	db.execute(
		`
		INSERT IGNORE INTO exam_grades (student_email, course_id, sec_no, exam_no, grade)
		VALUES (?, ?, ?, ?, ?)
		`,
		[ email, courseOne, courseOneSection, courseOneExamNo, courseOneExamGrade ]
	);
	db.execute(
		`
		INSERT IGNORE INTO exam_grades (student_email, course_id, sec_no, exam_no, grade)
		VALUES (?, ?, ?, ?, ?)
		`,
		[ email, courseTwo, courseTwoSection, courseTwoExamNo, courseTwoExamGrade ]
	);
	db.execute(
		`
		INSERT IGNORE INTO exam_grades (student_email, course_id, sec_no, exam_no, grade)
		VALUES (?, ?, ?, ?, ?)
		`,
		[ email, courseThree, courseThreeSection, courseThreeExamNo, courseThreeExamGrade ]
	);
});

fs.createReadStream('./csv/Posts_Comments.csv').pipe(csv()).on('data', (data) => {
	let course = data.Courses;
	let dropDeadline = data['Drop Deadline'];
	let post = data['Post 1'];
	let postBy = data['Post 1 By'];
	let comment = data['Comment 1'];
	let commentBy = data['Comment 1 By'];

	db.execute(
		`
		INSERT IGNORE INTO comments (course_id, post_no, comment_no, student_email, comment_info)
		VALUES (?, ?, ?, ?, ?)
		`,
		[ course, post, comment, postBy, commentBy ]
	);

	db.execute(
		`
		INSERT IGNORE INTO posts (course_id, post_no, student_email, post_info)
		VALUES (?, ?, ?, ?)
		`,
		[ course, post, postBy, comment ]
	);
});

/*
truncate table students;
truncate table zipcodes;
truncate table professors;
truncate table departments;
truncate table courses;
truncate table sections;
truncate table enrolls;
truncate table prof_teaching_teams;
truncate table ta_teaching_teams;
truncate table homeworks;
truncate table homework_grades;
truncate table exams;
truncate table exam_grades;
truncate table posts;
truncate table comments;

*/
