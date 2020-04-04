const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profile');
const coursesRoutes = require('./routes/courses');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/login', loginRoutes);
app.use('/profile', profileRoutes);
app.use('/courses', coursesRoutes);

app.listen(3001, () => console.log('listening on port 3001'));
