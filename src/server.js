//Dependencies

//Added for realtime server
import http from 'http'
import sirv from 'sirv';

import express from 'express';

//import polka from 'polka';
import mongoose from 'mongoose';
import compression from 'compression';
import * as sapper from '@sapper/server';

// Added for realtime
//import { getServer } from '@matrx/svelte-realtime-server'
//const io = require('socket.io');
import io from 'socket.io';
const server = http.createServer();



//Set the port and env
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// Initialize Express Server
const app = express();
//const app = polka();

//Socket.io
//var http = require('http').createServer(app);
//var io = require('socket.io')(http);


// Added for realtime
//const server = http.createServer(app)

// And here
//const nsp = getServer(server)

 // You can also use Express
 app.use(
	express.urlencoded({ extended: true }),
	express.json(),
	compression({ threshold: 0 }),
	//.static('static'),
	sirv('static', { dev }),
	sapper.middleware()
);

 // Connect to the Mongo DB **********************************************
// If deployed, use the deployed database. Otherwise use the local database
const MONGODB_URI =
process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sapper';

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
//import UsersRoutes from './api/users.routes';

// Sets the base route as localhost:4000/rally
// All routes will be off rally
//app.use('/user', UsersRoutes);


// io.on('connection', function(socket){
// 	console.log('a user connected');
//   });

// Start the server **********************************************
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});


// Chatroom
let numUsers = 0;
io(server).on('connection', socket => {
	let added = false;

	// when the client emits 'new message', this listens and executes
	socket.on('new message', data => {
		// we tell the client to execute 'new message'
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});

	// when the client emits 'add user', this listens and executes
	socket.on('add user', username => {
		if (added) return;

		// we store the username in the socket session for this client
		socket.username = username;
		++numUsers;
		added = true;
		socket.emit('login', { numUsers });
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('user joined', { username, numUsers });
	});

	// when the client emits 'typing', we broadcast it to others
	socket.on('typing', _ => socket.broadcast.emit('typing', { username:socket.username }));

	// when the client emits 'stop typing', we broadcast it to others
	socket.on('stop typing', _ => socket.broadcast.emit('stop typing', { username:socket.username }));

	// when the user disconnects.. perform this
	socket.on('disconnect', _ => {
		if (added) {
			--numUsers;
			// echo globally that this client has left
			socket.broadcast.emit('user left', { numUsers, username:socket.username });
		}
	});
});
