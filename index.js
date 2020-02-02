const express = require('express');
const app = express();

const port = 3000;

app.get('/', (request, response) => {
	response.send('hello worldy');
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
