require('dotenv').config();
const jwt = require('jsonwebtoken');

const isAuth = function(request, response, next) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		const error = new Error('no auth header');
		error.statusCode(401);
		throw error;
	}

	let verifiedToken;
	try {
		verifiedToken = jwt.verify(authHeader, process.env.KEY);
	} catch (error) {
		error.statusCode = 500;
		throw error;
	}

	if (!verifiedToken) {
		const error = new Error('not authenticated, wrong token');
		error.statusCode = 500;
		throw error;
	}

	// Attach the email to the request so we can access later on in the controllers. That means the jwt token must be set up with email on login.
	request.email = verifiedToken.email;

	next();
};

module.exports = isAuth;
