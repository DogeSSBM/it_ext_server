'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const server = express();
const port = 3000;
server.use(bodyParser.json());

const allowedOrigins = [
	'http://10.10.15.109:8080',
	'http://10.10.15.109:8080/',
	'http://10.10.15.109:8080/employees',
	'http://10.10.15.109:8080/employeesFilter',
	'http://localhost:3000',
	'http://localhost:3000/',
	'http://localhost:3000/employees',
	'http://localhost:3000/employeeFilter',
	'http://127.0.0.1:8080',
	'http://127.0.0.1:8080/',
	'http://127.0.0.1:8080/employees',
	'http://127.0.0.1:8080/employeeFilter',
];

server.use(cors({
	origin: (origin, callback) => {
		// allow requests with no origin
		// (like mobile apps or curl requests)
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
}));

// eslint-disable-next-line no-unused-vars
async function selectFromDb() {
	// console.log('Selecting from db...');
	return db('test');
}

// eslint-disable-next-line no-unused-vars
async function insertIntoDb(data) {
	// console.log('Inserting into db...');
	return db('test').insert(data);
}

// eslint-disable-next-line no-unused-vars
async function deleteFromDb(id) {
	// console.log(`Deleting ${id} from db...`);
	return db('test').where({ id }).del();
}

server.get(
	'/',
	() => console.log('Received GET request'),
);

server.post(
	'/employees',
	(request, response) => {
		console.log('Received POST request');
		const reqJsonFilter = request.body;
		return (
			db('test').where(builder => {
				let query = builder;
				if (reqJsonFilter.first_lower) {
					query = query.where('first_lower', 'like', `%${reqJsonFilter.first_lower}%`);
				}
				if (reqJsonFilter.last_lower) {
					query = query.where('last_lower', 'like', `%${reqJsonFilter.last_lower}%`);
				}
				if (reqJsonFilter.alias_lower) {
					query = query.where('alias_lower', 'like', `%${reqJsonFilter.alias_lower}%`);
				}
				if (reqJsonFilter.ext) {
					query = query.where('ext', 'like', `%${reqJsonFilter.ext}%`);
				}
				if (reqJsonFilter.department) {
					query = query.where('department', 'like', `%${reqJsonFilter.department}%`);
				}
				if (reqJsonFilter.position) {
					query = query.where('position', 'like', `%${reqJsonFilter.position}%`);
				}
				if (reqJsonFilter.email) {
					query = query.where('email', 'like', `%${reqJsonFilter.email}%`);
				}
				return query;
			})
				.then(rows => response.send(rows))
		);
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
