var BlogPost = require('mongoose').model('BlogPost');
var User = require('mongoose').model('User');

var getErrorMessage = function (error) {
    if (error.errors) {
        for (var errorName in error.errors) {
            if (error.errors[errorName].message) {
                return error.errors[errorName].message;
            }
        }
    }
    else {
        return 'Unkown server error';
    }
};

exports.create = function (req, res) {
    var blogPost = new BlogPost(req.body);
    blogPost.user = req.user;

    blogPost.save(function (error) {
        if (error) {
            return res.status(400).send({
                message: getErrorMessage(error)
            });
        }
        else {
            res.json(blogPost);
        }
    });
};

exports.find = function (req, res) {
    var limit = Number(req.query.limit) || 0;
    var offset = Number(req.query.offset) || 0;

    console.log("Offset:" + offset);
    console.log("Limit:" + limit);

    BlogPost.find()
        .skip(offset)
        .limit(limit)
        .sort('-created')
        .populate('author', 'firstName lastName fullName')
        .exec(function (error, blogPosts) {
            if (error) {
                console.log(error);
                return res.status(400).send({
                    message: getErrorMessage(error)
                });
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
    BlogPost.findById(id)
        .populate('author', 'firstName lastName fullName')
        .exec(function (error, blogPost) {
            if (error) {
                return next(error);
            }
            if (!blogPost) {
                return next(new Error('failed to load blog post' + id));
            }

            req.blogPost = blogPost;
            next();
        });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.blogPost.author.id !== req.user.id) {
        return res.status(403).send({
            message: "User is not authorized"
        });
    }

    next();
};

exports.importBlogs = function() {
    var importBlogPosts = require('../../config/importBlogPosts.js');
     importBlogPosts();
};



