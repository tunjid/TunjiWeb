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

var composeMessage = function (res, message, statusCode) {
    if (statusCode)
        res.status(statusCode);
    return res.json({message: message});
};

exports.create = function (req, res) {
    var blogPost = new BlogPost(req.body);
    blogPost.author = req.user;

    if (!blogPost.author) {
        return composeMessage(res, "A blog post needs an author");
    }

    blogPost.save(function (error) {
        if (error) {
            return res.status(400).send({
                message: getErrorMessage(error)
            });
        }
        else res.json(blogPost);
    });
};

exports.find = function (req, res) {
    var limit = Number(req.query.limit) || 0;
    var offset = Number(req.query.offset) || 0;

    var query = {};

    if (req.query.tag) {
        query.tags = req.query.tag;
    }

    if (req.query.category) {
        query.categories = req.query.category;
    }

    if(req.query.freeForm) {
        var searchString = req.query.freeForm;

        query.$or = [
            {'title':{'$regex':searchString, '$options':'i'}},
            {'tags':{'$regex':searchString, '$options':'i'}},
            {'categories':{'$regex':searchString, '$options':'i'}}
        ];
    }

    if(req.query.month && req.query.year) {
        var month = Number(req.query.month) || 0;
        var year = Number(req.query.year) || 0;

        var startDate = new Date(year, month, 1);
        var endDate = new Date(year, month, 31);

        query.created  = {
            $gte: startDate,
            $lt: endDate
        }
    }

    BlogPost.find(query)
        .skip(offset)
        .limit(limit)
        .sort({'created': -1})
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
        else res.json(blogPost);
    });
};

exports.delete = function (req, res, next) {
    req.blogPost.remove(function (error) {

        if (error)
            return next(error);

        else res.json(req.blogPost);
    });
};

exports.blogPostById = function (req, res, next, id) {

    BlogPost.findById(id)
        .populate('author', 'firstName lastName fullName')
        .exec(function (error, blogPost) {

            if (error)
                return next(error);

            if (!blogPost)
                return composeMessage(res, "Failed to load blog post with id " + id);

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

exports.getTagsOrCategories = function (req, res) {
    var type = req.query.type;

    if (type == 'tags' || type == 'categories') {
        BlogPost.distinct(type, function (error, result) {
            if (error) {
                return composeMessage(res, "Error retrieving tags / categories");
            }
            else res.json(result);
        });
    }
    else return composeMessage(res, 'Must pick a tag or category', 400);
};


exports.getArchives = function (req, res) {
    BlogPost.aggregate(
        [{
            $group: {
                _id: {month: {$month: "$created"}, year: {$year: "$created"}},
                count: {$sum: 1},
                titles: { $push: "$title" }
            }
        }],
        function (error, result) {
            if (error) {
                return composeMessage(res, "Error aggregating months");
            }
            else res.json(result);
        }
    )
};

exports.importBlogs = function (req, res) {
    if (req.user) {
        var importBlogPosts = require('../../config/importBlogPosts.js');
        var importStatus = importBlogPosts(req.user);

        res.json({status: importStatus});
    }
    else return composeMessage(res, 'Failed to import blogs, no signed in user');
};



