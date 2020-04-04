const sequelize = require('sequelize');
const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = function(request, response, next) {
	// This should take the information from the form body from fetch request, attempt to find the email and check the password. My database actually isn't hashed so we don't need to do that yet. Check that it's legit. If so, create a jwt and send back to the client.
	const email = request.body.email;
	const password = request.body.password;
};

module.exports = {
	postLogin
};
