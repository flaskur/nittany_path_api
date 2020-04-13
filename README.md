## nittany path api
### This is the backend portion of the nittany path application. This will handle the network requests that it receives from the front end. It is a traditional REST API with a focus on database queries to a mySQL database.

I included the script I used to populate my local database in populate.js. The connection information is also included in database.js. You can view some of the raw SQL queries I used in the queries.sql file or in any of the controller files.

I organized the express web server to use an isAuth middleware whenever accessing a restricted route. This ensures that the user has the correct JSON web token and is authorized to use this route.

The routes themselves implement the REST architecture and are individually handled by the logic inside of the controllers. Many of the controller functions query to the database and send the proper json string response back to the client side.

Click Below To View Frontend Source Code
[UI SOURCE CODE](https://github.com/flaskur/nittany_path)

