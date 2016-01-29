// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object
module.exports = {
	db: 'mongodb://localhost/prod',
	sessionSecret: process.env.SESSION_SECRET
};