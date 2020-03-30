// const db = require('./database');

// db.execute(
// 	`
//   INSERT INTO users (name, age)
//   VALUES (?, ?)
// `,
// 	[ 'beth', 22 ],
// 	(err, results, fields) => {
// 		if (err) {
// 			console.log(err);
// 		}

// 		console.log(results);
// 		console.log(fields);
// 	}
// );

const fs = require('fs');
const readline = require('readline');
const db = require('./database');

const processLine = async function() {
	const fileStream1 = fs.createReadStream('./csv/Professors.csv');

	const rl = readline.createInterface({
		input: fileStream1
	});

	rl.on('line', (line) => {
		let arr = line.split(',');
		if (arr[0] === 'Name') return;
		console.log(arr);

		let name = arr[0];
		let email = arr[1];
		let password = arr[2];
		let age = parseInt(arr[3], 10);
		let gender = arr[4];
		let department = arr[5];
		let office = arr[6].slice(1) + arr[7].slice(0, arr[7].length - 1);
		let departmentName = arr[8];
		let title = arr[9];
		let teachingTeamId = parseInt(arr[10], 10);
		let teaching = arr[11];

		db.execute(
			`
		  INSERT INTO professors (email, password, name, age, gender, office_address, department, title)
		  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`,
			[ email, password, name, age, gender, office, department, title ]
		);

		db.execute(
			`
		  INSERT INTO prof_teaching_teams (prof_email, teaching_team_id)
		  VALUES (?, ?)
		`,
			[ email, teachingTeamId ]
		);

		if (title === 'Head') {
			db.execute(
				`
		    INSERT INTO departments (dept_id, dept_name, dept_head)
		    VALUES (?, ?, ?)
		  `,
				[ department, departmentName, name ]
			);
		}
	});

	const fileStream2 = fs.createReadStream('./csv/Students_TA.csv');

	const r2 = readline.createInterface({
		input: fileStream2
	});

	r2.on('line', (line) => {
		let arr = line.split(',');
		if (arr[0] === 'Full Name') {
			console.log('first line return');
			return;
		}
		console.log('redners');

		let fullName = arr[0];
		let email = arr[1];
		let age = parseInt(arr[2], 10);
		let zip = parseInt(arr[3], 10);
		let phone = arr[4];
		let gender = arr[5];
		let city = arr[6];
		let state = arr[7];
		let password = arr[8];
		let street = arr[9].slice(0, arr[9].length - 1);
		let major = arr[10];
		let courseOne = arr[11];
		let courseOneName = arr[12];
		let courseOneDetails = arr[13];
		let courseOneSection = parseInt(arr[14], 10);
		let courseOneSectionLimit = parseInt(arr[15], 10);
		let courseOneHomeworkNo = parseInt(arr[16], 10);
		let courseOneHomeworkDetails = arr[17];
		let courseOneHomeworkGrade = arr[18];
		let courseOneExamNo = parseInt(arr[19], 10);
		let courseOneExamDetails = arr[20];
		let courseOneExamGrade = arr[21];
		let courseTwo = arr[22];
		let courseTwoName = arr[23];
		let courseTwoDetails = arr[24];
		let courseTwoSection = parseInt(arr[25], 10);
		let courseTwoSectionLimit = parseInt(arr[26], 10);
		let courseTwoHomeworkNo = parseInt(arr[27], 10);
		let courseTwoHomeworkDetails = arr[28];
		let courseTwoHomeworkGrade = arr[29];
		let courseTwoExamNo = parseInt(arr[30], 10);
		let courseTwoExamDetails = arr[31];
		let courseTwoExamGrade = arr[32];
		let courseThree = arr[33];
		let courseThreeName = arr[34];
		let courseThreeDetails = arr[35];
		let courseThreeSection = parseInt(arr[36], 10);
		let courseThreeSectionLimit = parseInt(arr[37], 10);
		let courseThreeHomeworkNo = parseInt(arr[38], 10);
		let courseThreeHomeworkDetails = arr[39];
		let courseThreeHomeworkGrade = arr[40];
		let courseThreeExamNo = parseInt(arr[41], 10);
		let courseThreeExamDetails = arr[42];
		let courseThreeExamGrade = arr[43];
		let teachingTeamId = parseInt(arr[44], 10);

		console.log(courseOne, courseOneName, courseOneDetails);

		db.execute(
			`
			INSERT INTO students (email, password, name, age, gender, major, street, zipcode)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`,
			[ email, password, fullName, age, gender, major, street, zip ]
		);

		db.execute(
			`
			INSERT INTO zipcodes (zipcode, city, state)
			VALUES (?, ?, ?)
		`,
			[ zip, city, state ]
		);

		// no deadline?
		db.execute(
			`
			INSERT INTO courses (course_id, course_name, course_description)
			VALUES (?, ?, ?)
			`,
			[ courseOne, courseOneName, courseOneDetails ]
		);
		db.execute(
			`
			INSERT INTO courses (course_id, course_name, course_description)
			VALUES (?, ?, ?)
			`,
			[ courseTwo, courseTwoName, courseTwoDetails ]
		);
		db.execute(
			`
			INSERT INTO courses (course_id, course_name, course_description)
			VALUES (?, ?, ?)
			`,
			[ courseThree, courseThreeName, courseThreeDetails ],
			(err) => console.log(err)
		);

		/*
		// only 1?
		db.execute(
			`
			INSERT INTO sections (course_id, sec_no, limit, teaching_team_id)
			VALUES (?, ?, ?, ?)
			`,
			[ courseOne, courseOneSection, courseOneSectionLimit, teachingTeamId ]
		);
		db.execute(
			`
			INSERT INTO sections (course_id, sec_no, limit, teaching_team_id)
			VALUES (?, ?, ?, ?)
			`,
			[ courseTwo, courseTwoSection, courseTwoSectionLimit, teachingTeamId ]
		);
		db.execute(
			`
			INSERT INTO sections (course_id, sec_no, limit, teaching_team_id)
			VALUES (?, ?, ?, ?)
			`,
			[ courseThree, courseThreeSection, courseThreeSectionLimit, teachingTeamId ]
		);

		
		db.execute(
			`
			INSERT INTO enrolls (student_email, course_id, sec_no)
			VALUES (?, ?, ?)
			`,
			[ email, courseOne, courseOneSection ]
		);
		db.execute(
			`
			INSERT INTO enrolls (student_email, course_id, sec_no)
			VALUES (?, ?, ?)
			`,
			[ email, courseTwo, courseTwoSection ]
		);
		db.execute(
			`
			INSERT INTO enrolls (student_email, course_id, sec_no)
			VALUES (?, ?, ?)
			`,
			[ email, courseThree, courseThreeSection ]
		);

		db.execute(
			`
			INSERT INTO ta_teaching_teams (student_email, teaching_team_id)
			VALUES (?, ?)
			`,
			[ email, teachingTeamId ]
		);

		db.execute(
			`
			INSERT INTO homeworks (course_id, sec_no, hw_no, hw_details)
			VALUES (?, ?, ?)
			`,
			[ courseOne, courseOneSection, courseOneHomeworkNo, courseOneHomeworkDetails ]
		);
		db.execute(
			`
			INSERT INTO homeworks (course_id, sec_no, hw_no, hw_details)
			VALUES (?, ?, ?)
			`,
			[ courseTwo, courseTwoSection, courseTwoHomeworkNo, courseTwoHomeworkDetails ]
		);
		db.execute(
			`
			INSERT INTO homeworks (course_id, sec_no, hw_no, hw_details)
			VALUES (?, ?, ?)
			`,
			[ courseThree, courseThreeSection, courseThreeHomeworkNo, courseThreeHomeworkDetails ]
		);

		db.execute(
			`
			INSERT INTO homework_grades (student_email, course_id, sec_no, hw_no, grade)
			VALUES (?, ?, ?, ?)
			`,
			[ email, courseOne, courseOneSection, courseOneHomeworkNo, courseOneHomeworkGrade ]
		);
		db.execute(
			`
			INSERT INTO homework_grades (student_email, course_id, sec_no, hw_no, grade)
			VALUES (?, ?, ?, ?)
			`,
			[ email, courseTwo, courseTwoSection, courseTwoHomeworkNo, courseTwoHomeworkGrade ]
		);
		db.execute(
			`
			INSERT INTO homework_grades (student_email, course_id, sec_no, hw_no, grade)
			VALUES (?, ?, ?, ?)
			`,
			[ email, courseThree, courseThreeSection, courseThreeHomeworkNo, courseThreeHomeworkGrade ]
		);

		db.execute(
			`
			INSERT INTO exams (course_id, sec_no, exam_no, exam_details)
			VALUES (?, ?, ?, ?)
			`,
			[ courseOne, courseOneSection, courseOneExamNo, courseOneExamDetails ]
		);
		db.execute(
			`
			INSERT INTO exams (course_id, sec_no, exam_no, exam_details)
			VALUES (?, ?, ?, ?)
			`,
			[ courseTwo, courseTwoSection, courseTwoExamNo, courseTwoExamDetails ]
		);
		db.execute(
			`
			INSERT INTO exams (course_id, sec_no, exam_no, exam_details)
			VALUES (?, ?, ?, ?)
			`,
			[ courseThree, courseThreeSection, courseThreeExamNo, courseThreeExamDetails ]
		);

		db.execute(
			`
			INSERT INTO exam_grades (student_email, course_id, sec_no, exam_no, grades)
			VALUES (?, ?, ?, ?, ?)
			`,
			[ email, courseOne, courseOneSection, courseOneExamNo, courseOneExamGrade ]
		);
		db.execute(
			`
			INSERT INTO exam_grades (student_email, course_id, sec_no, exam_no, grades)
			VALUES (?, ?, ?, ?, ?)
			`,
			[ email, courseTwo, courseTwoSection, courseTwoExamNo, courseTwoExamGrade ]
		);
		db.execute(
			`
			INSERT INTO exam_grades (student_email, course_id, sec_no, exam_no, grades)
			VALUES (?, ?, ?, ?, ?)
			`,
			[ email, courseThree, courseThreeSection, courseThreeExamNo, courseThreeExamGrade ]
		);

		*/
	});
};

processLine();

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
