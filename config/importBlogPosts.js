module.exports = function (user) {

    var blogPosts = require('./blogPosts')();
    var BlogPost = require('mongoose').model('BlogPost');

    importBlogPosts(blogPosts);

    function importBlogPosts(blogPosts) {

        blogPosts.forEach(cleanUpPost);

        function cleanUpPost(blogPost) {

            if (blogPost['dc:creator']) {
                delete blogPost['dc:creator'];
            }

            if (blogPost.categories instanceof String) {
                swap(blogPost.categories);
            }

            if (blogPost.tags instanceof String) {
                swap(blogPost.tags);
            }

           return saveBlogPost(blogPost);
        }

        function swap(object) {
            var tempString = object;

            object = [];
            object.push(tempString)
        }

        function saveBlogPost(basePost) {
            var blogPost = new BlogPost(basePost);
            blogPost.author = user;
            blogPost.created = new Date(blogPost.stringDate);

            blogPost.save(function (error) {
                return !error;
            });
        }
    }
};