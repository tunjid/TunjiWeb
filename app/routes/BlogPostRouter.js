var users = require('../../app/controllers/UserController');
var blogPosts = require('../../app/controllers/BlogPostController');

module.exports = function (app) {

    app.route('/api/blogPosts/archives')
        .get(blogPosts.getArchives);

    app.route('/api/blogPosts/recentTags')
        .get(blogPosts.getTagsOrCategories);

    app.route('/api/blogPosts')
        .post(users.requiresLogin, blogPosts.create)
        .get(blogPosts.find);

    app.route('/api/blogPosts/:blogPostId')
        .get(blogPosts.get)
        .put(users.requiresLogin, blogPosts.put)
        .delete(users.requiresLogin, blogPosts.hasAuthorization, blogPosts.delete);

    app.route('/importBlogPosts')
        .get(blogPosts.importBlogs);

    app.param('blogPostId', blogPosts.blogPostById);
};