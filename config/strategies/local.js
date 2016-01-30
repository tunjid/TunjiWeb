var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function () {

    passport.use(new LocalStrategy(authCallback));

    function authCallback(username, password, done) {
        User.findOne({
                username: username
            },
            function (error, user) {

                if (error) {
                    return done(error);
                }

                if (!user) {
                    return done(null, false, {
                        message: 'Unkown user'
                    });
                }

                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }

                return done(null, user);
            });
    }
};