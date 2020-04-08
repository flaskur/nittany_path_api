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

module.exports = {
	getFaculty
};
