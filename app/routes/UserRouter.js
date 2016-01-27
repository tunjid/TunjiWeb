var users = require('../../app/controllers/UserController');

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

    app.route('/signin')
        .post(users.signin);

    app.param('userId', users.userById);
};