process.env.NODE_ENV = require('./config/config').serverEnvironment;

var express = require('./config/express');
var passport = require('./config/passport');

var app = express();
passport();

module.exports = app;
