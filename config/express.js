var express = require('express');

var bodyParser = require('body-parser');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var passport = require('passport');
var path = require('path');
var session = require('express-session');

function ensureSecure(req, res, next) {
    var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
    if (schema === 'https') next();
    else res.redirect('https://' + req.headers.host + req.url);
}

module.exports = function () {

    // Augment prototypes
    var augmentation = require('./augmentation');
    augmentation();

    var mongoose = require('../config/mongoose');
    mongoose();

    var config = require('./config');
    var angularRouter = require('../app/routes/AngularRouter');
    var blogPostRouter = require('../app/routes/BlogPostRouter');
    var userRouter = require('../app/routes/UserRouter');

    var app = express();

    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
    else if (process.env.NODE_ENV === 'production') app.use(compress());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({saveUninitialized: true, resave: true, secret: config.sessionSecret}));
    app.use(ensureSecure);

// view engine setup
    //app.set('views', path.join(__dirname, 'views'));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(passport.initialize());
    app.use(passport.session());

    // uncomment after placing your favicon in /public
    // app.use(favicon('./public/images/pic.jpg'));

    app.use(cookieParser());

    // set the static files location
    app.use('/public', express.static('./public'));


    angularRouter(app);
    blogPostRouter(app);
    userRouter(app);

    app.all('/*', function (req, res) {
        res.render('index', {title: 'Adetunji Dahunsi'});
    });

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
