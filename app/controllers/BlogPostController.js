var BlogPost = require('mongoose').model('BlogPost');

exports.create = function (req, res, next) {
    var blogPost = new BlogPost(req.body);

    blogPost.save(function (error) {
        if (error) {
            return next(error);
        }
        else {
            res.json(blogPost);
        }
    });
};

exports.find = function (req, res, next) {
    BlogPost.find({}, function (error, blogPosts) {
        if (error) {
            return next(error);
        }
        else {
            res.json(blogPosts);
        }
    });
};

exports.get = function (req, res) {
    res.json(req.blogPost);
};

exports.put = function (req, res, next) {
    BlogPost.findByIdAndUpdate(req.blogPost.id, req.body, function (error, blogPost) {
        if (error) {
            return next(error);
        }
        else {
            res.json(blogPost);
        }
    });
};

exports.delete = function (req, res, next) {
    req.blogPost.remove(function (error) {
        if (error) {
            return next(error);
        }
        else {
            res.json(req.blogPost);
        }
    });
};

exports.blogPostById = function (req, res, next, id) {
    BlogPost.findOne({_id: id}, function (error, blogPost) {
        if (error) {
            return next(error);
        }
        else {
            req.blogPost = blogPost;
            next();
        }
    });
};

exports.delete = function (req, res, next) {

};


