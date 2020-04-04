const db = require('../database');

const getCourses = function(request, response, next) {
	// accesses all the information in the checking info table using sequelize, then returns the data as json. This should be protected so you should have a json token, but for now I'll disregard.
	// sequelize, get the table that joins enrolls, courses, professors. Return the data as a json string to the client.
};

module.exports = {
	getCourses
};
