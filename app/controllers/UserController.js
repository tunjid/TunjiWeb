var User = require('mongoose').model('User');
var passport = require('passport');

var composeMessage = function (res, message) {
    return res.json({message: message});
};

// Create a new error handling controller method
var getErrorMessage = function (err) {
    // Define the error message variable
    var message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            // If a general error occurs set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }

    // Return the message error
    return message;
};

exports.create = function (req, res, next) {
    var user = new User(req.body);

    console.log(req.body);

    user.save(function (error) {
        if (error) {
            return next(error);
        }
        else {
            res.json(user);
        }
    });
};

exports.find = function (req, res, next) {
    User.find({}, function (error, users) {
        if (error) {
            return next(error);
        }
        else {
            res.json(users);
        }
    });
};

exports.get = function (req, res) {
    res.json(req.user);
};

exports.put = function (req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function (error, user) {
        if (error) {
            return next(error);
        }
        else {
            res.json(user);
        }
    });
};

exports.delete = function (req, res, next) {
    req.user.remove(function (error) {
        if (error) {
            return next(error);
        }
        else {
            res.json(req.user);
        }
    });
};

exports.userById = function (req, res, next, id) {
    User.findOne({_id: id}, function (error, user) {
        if (error) {
            return next(error);
        }
        else {
            req.user = user;
            next();
        }
    });
};

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: "User is not logged in"
        });
    }

    next();
};

// Create a new controller method that creates new 'regular' users
exports.signup = function (req, res) {
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    if (!req.user) {
        // Create a new 'User' model instance
        var user = new User(req.body);

        // Set the user provider property
        user.provider = 'local';

        // Try saving the new user document
        user.save(function (err) {
            // If an error occurs, use flash messages to report the error
            if (err) {
                // Use the error handling method to get the error message
                var message = getErrorMessage(err);

                // Redirect the user back to the signup page
                return composeMessage(res, message);
            }

            // If the user was created successfully use the Passport 'login' method to login
            req.login(user, function (err) {
                // If a login error occurs move to the next middleware
                if (err) {
                    return composeMessage(res, 'Login error');
                }
                // Redirect the user back to the main application page
                res.json(user);
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signin = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return composeMessage(res, 'User does not exist');
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.json(e);
            }
            return res.json(user);
        });
    })(req, res, next);
};

// Create a new controller method for signing out
exports.signout = function (req, res) {
    // Use the Passport 'logout' method to logout
    req.logout();

    // Redirect the user back to the main application page
    res.redirect('/');
};
