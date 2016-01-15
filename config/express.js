var express = require('express');

var bodyParser = require('body-parser');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');

module.exports = function () {

    // Augment prototypes
    var augmentation = require('./augmentation');
    augmentation();

    var mongoose = require('../config/mongoose');
    mongoose();

    var config = require('./config');
    var angularRouter = require('../app/routes/AngularRouter');
    var blogPostRouter = require('../app/routes/BlogPostRouter');

    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(
        {
            extended: true
        }
    ));

    app.use(session(
        {
            saveUninitialized: true,
            resave: true,
            secret: config.sessionSecret
        }
    ));

// view engine setup
    //app.set('views', path.join(__dirname, 'views'));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(cookieParser());

    // set the static files location
    app.use('/public', express.static('./public'));


    angularRouter(app);
    blogPostRouter(app);

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return app;
};
