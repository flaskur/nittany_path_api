const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profile');
const coursesRoutes = require('./routes/courses');
const db = require('./pool');

const app = express();

app.get('/', (request, response, next) => {
	db.execute(
		`
		SELECT * from students
		`,
		(err, results) => {
			response.json(results);
		}
	);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/login', loginRoutes);
app.use('/profile', profileRoutes);
app.use('/courses', coursesRoutes);

app.listen(3001, () => console.log('listening on port 3001'));
