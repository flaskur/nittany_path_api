require('dotenv').config();
const jwt = require('jsonwebtoken');

const isAuth = function(request, response, next) {
	// We expect a authorization header from the client side. Basically we extract that from the header, check if it's valid, if so, we run next() to continue with the normal controller.
	const authHeader = request.get('authorization');
	console.log(authHeader, 'authHeader');

	if (!authHeader) {
		const error = new Error('no auth header');
		error.statusCode(401);
		throw error;
	}

	// 'bearer token'
	const token = authHeader.split(' ')[1];

	try {
		const verifiedToken = jwt.verify(token, process.env.KEY);
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
