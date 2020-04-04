require('dotenv').config();
const db = require('../pool');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = function(request, response, next) {
	const email = request.body.email;
	const password = request.body.password;

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
			if (error) throw error;

			// No valid email
			if (result.length === 0) {
				response.json({ message: 'user email does not exist' });
				// const error = new Error('user email does not exist');
				// error.statusCode = 401;
				// throw error;
			}

			let user = result[0];

			// Passwords do not match
			if (password !== user.password) {
				response.json({ message: 'password is not correct' });
				// const error = new Error('password is not correct');
				// error.statusCode = 401;
				// throw error;
			}

			// We are authenticated, create jwt
			const token = jwt.sign(
				{
					email: user.email
				},
				process.env.KEY
			);

			response.status(200).json({
				email: user.email,
				token: token
			});
		}
	);
};

module.exports = {
	postLogin
};
