'use strict';

const express = require('express');
const cors = require('cors');
const db = require('./db');

const server = express();
const port = 3000;

async function selectFromDb() {
	console.log('Selecting from db...');
	return db('test');
}

// eslint-disable-next-line no-unused-vars
async function insertIntoDb(data) {
	console.log('Inserting into db...');
	return db('test').insert(data);
}

// eslint-disable-next-line no-unused-vars
async function deleteFromDb(id) {
	console.log(`Deleting ${id} from db...`);
	return db('test').where({ id }).del();
}

server.get(
	'/employees',
	cors(),
	(request, response) => {
		selectFromDb().then(rows => {
			response.send(rows);
		});
	},
);

server.post(
	'/',
	(request, response) => {
		console.log('post (console)');
		response.send('post (response)');
	},
);

server.patch(
	'/',
	(request, response) => {
		console.log('patch (console)');
		response.send('patch (response)');
	},
);

server.delete(
	'/',
	(request, response) => {
		console.log('delete (console)');
		response.send('delete (response)');
	},
);

server.listen(
	port,
	() => console.log(`Listening on port: ${port}`),
);
