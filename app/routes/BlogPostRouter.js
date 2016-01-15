var blogPosts = require('../../app/controllers/BlogPostController');

module.exports = function (app) {
    app.route('/api/blogPosts')
        .post(blogPosts.create)
        .get(blogPosts.find);

    app.route('/api/blogPosts/:blogPostId')
        .get(blogPosts.get)
        .put(blogPosts.put)
        .delete(blogPosts.delete);

    app.param('blogPostId', blogPosts.blogPostById);
};