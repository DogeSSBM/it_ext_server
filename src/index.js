'use strict';

const express = require('express');
const server = express();
const port = 3000;

server.get(
	'/',
	(request, response) => {
		console.log('get (console)');
		response.send('get (response)');
	},
)

server.post(
	'/',
	(request, response) => {
		console.log('post (console)');
		response.send('post (response)');
	},
)

server.patch(
	'/',
	(request, response) => {
		console.log('patch (console)');
		response.send('patch (response)');
	},
)

server.delete(
	'/',
	(request, response) => {
		console.log('delete (console)');
		response.send('delete (response)');
	},
)

server.listen(
	port,
	() => {
		console.log(`havin a listen on port: ${port}`);
	},
)
