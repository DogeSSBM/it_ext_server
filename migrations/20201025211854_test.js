'use strict';

exports.up = async function up(knex) {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
	return knex.schema.createTable('test', table => {
		table
			.uuid('id')
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.notNullable()
			.primary();
		table.text('first_name').notNull();
		table.text('first_lower').notNull();
		table.text('last_name').notNull();
		table.text('last_lower').notNull();
		table.text('alias_name');
		table.text('alias_lower');
		table.integer('ext').unsigned();
		table.text('position');
		table.text('department');
		table.text('email');
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTableIfExists('test');
	return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};
