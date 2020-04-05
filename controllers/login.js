require('dotenv').config();
const db = require('../pool');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = function(request, response, next) {
	const email = request.body.email;
	const password = request.body.password;

	if (!email || !password) {
		response.json({ message: 'no email/password' });
		return;
	}

	db.execute(
		`
		select students.email as email, students.password as password 
		from students
		where email = ?
		UNION
		select professors.email as email, professors.password as password
		from professors
		where email = ?
		`,
		[ email, email ],
		(error, result) => {
			if (error) {
				console.log('runs 2');
				throw error;
			}

			// No valid email
			if (result.length === 0) {
				response.json({ message: 'user email does not exist' });
				return;
			}

			let user = result[0];

			// Passwords do not match
			bcrypt.compare(password, user.password, (error, success) => {
				if (error) throw error; // the comparision actually fails

				if (!success) {
					response.json({ message: 'password is not correct' });
					return;
				}
			});

			// We are authenticated, create jwt
			const token = jwt.sign(
				{
					email: user.email
				},
				process.env.KEY
			);

			response.json({
				email: user.email,
				token: token
			});
		}
	);
};

module.exports = {
	postLogin
};
