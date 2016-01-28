process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var passport = require('./config/passport');

var app = express();
passport();

app.set('port', process.env.PORT || 3000);


console.log("Server listening on " + app.get('port'));

module.exports = app;
