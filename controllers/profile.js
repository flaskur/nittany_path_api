const db = require('../database');

const getProfile = function(request, response, next) {
	const email = request.email;
	const role = request.params.role;

	if (role === 'student') {
		db.execute(
			`
			select * from students
			where students.email = ?
			`,
			[ email ],
			(error, result) => {
				if (error) throw error;

				response.json(result[0]);
			}
		);
	} else if (role === 'faculty') {
		db.execute(
			`
			select * from professors
			where professors.email = ?
			`,
			[ email ],
			(error, result) => {
				if (error) throw error;

				response.json(result[0]);
			}
		);
	}
};

module.exports = {
	getProfile
};
