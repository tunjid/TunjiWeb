var mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect('mongodb://localhost/tunji-web');

    require('../app/models/BlogPostSchema');

    return db;
};