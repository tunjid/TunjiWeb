var users = require('../../app/controllers/UserController');
var passport = require('passport');

module.exports = function (app) {
    app.route('/api/users')
        .post(users.create)
        .get(users.find);

    app.route('/api/users/:userId')
        .get(users.get)
        .put(users.put)
        .delete(users.delete);

    app.route('/signup')
        .post(users.signup);

    // Set up the 'signin' routes
    app.route('/signin')
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureFlash: true
        }));


    app.param('userId', users.userById);
};