process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var passport = require('./config/passport');

var app = express();
passport();

app.set('port', process.env.PORT || 3000);


if (process.env.NODE_ENV === 'development') {
    app.listen(app.get('port'), function () {
        console.log('Server listening on ' + app.get('port') + ' in ' + app.get('env') + ' mode.');
    });
}
else if (process.env.NODE_ENV === 'production') {
    app.listen(app.get('port'), '10.128.9.90', function () {
        console.log('Server listening on ' + app.get('port') + ' in ' + app.get('env') + ' mode.');
    });
}


module.exports = app;
