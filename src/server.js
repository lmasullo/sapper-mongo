//Dependencies
const express = require('express');
const mongoose = require('mongoose');
import compression from 'compression';
import * as sapper from '@sapper/server';

// Initialize Express Server
const app = express();

 // You can also use Express
 app.use(
	express.urlencoded({ extended: true }),
	express.json(),
	compression({ threshold: 0 }),
	express.static('static'),
	sapper.middleware()
);


//Set the port and env
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

 // Connect to the Mongo DB **********************************************
// If deployed, use the deployed database. Otherwise use the local database
const MONGODB_URI =
process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/users';

// Connect to the db
mongoose
.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})
.then(() => {
	// Display the connection message
	console.log('MongoDB database connection established Successfully');
})
.catch(function(err) {
	// If an error occurred, log it
	console.log(err);
});


// Require routes
//const UsersRoutes = require('./api/users.route');

// Sets the base route as localhost:4000/rally
// All routes will be off rally
//app.use('/user', UsersRoutes);


// Start the server **********************************************
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});
