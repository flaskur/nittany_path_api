const db = require('../database');
const bcrypt = require('bcryptjs');

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

const resetPassword = function(request, response, next) {
	const { currentPassword, newPassword, confirmPassword, isStudent } = request.body;
	const email = request.email;

	if (newPassword !== confirmPassword) {
		return response.json({ message: "failure, new/confirm don't match" });
	}

	if (isStudent) {
		db.execute(
			`
			select students.password from students
			where students.email = ?
			`,
			[ email ],
			(error, result) => {
				if (error) throw error;
				let hashedPassword = result[0].password;

				bcrypt.compare(currentPassword, hashedPassword, (error, success) => {
					if (error) throw error;

					if (!success) return response.json({ message: "current password doesn't match" });

					let salt = bcrypt.genSaltSync(1);
					let newHashedPassword = bcrypt.hashSync(newPassword, salt);

					db.execute(
						`
						update students
						set students.password = ?
						where students.email = ?
						`,
						[ newHashedPassword, email ],
						(error) => {
							if (error) throw error;
							return response.json({ message: 'successful reset password' });
						}
					);
				});
			}
		);
	} else {
		db.execute(
			`
			select professors.password from professors
			where professors.email = ?
			`,
			[ email ],
			(error, result) => {
				if (error) throw error;
				let hashedPassword = result[0].password;

				bcrypt.compare(currentPassword, hashedPassword, (error, success) => {
					if (error) throw error;

					if (!success) return response.json({ message: "current password doesn't match" });

					let salt = bcrypt.genSaltSync(1);
					let newHashedPassword = bcrypt.hashSync(newPassword, salt);

					db.execute(
						`
						update professors
						set professors.password = ?
						where professors.email = ?
						`,
						[ newHashedPassword, email ],
						(error) => {
							if (error) throw error;
							return response.json({ message: 'successful reset password' });
						}
					);
				});
			}
		);
	}
};

module.exports = {
	getProfile,
	resetPassword
};
