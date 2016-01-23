module.exports = function () {

    var blogPosts = require('./blogPosts')();
    var User = require('mongoose').model('User');
    var BlogPost = require('mongoose').model('BlogPost');


    importBlogPosts(blogPosts/*.slice(Math.max(blogPosts.length - 3, 1))*/);

    function importBlogPosts(blogPosts) {

        blogPosts.forEach(cleanUpPost);

        function cleanUpPost(blogPost) {

            if (blogPost['dc:creator']) {
                delete blogPost['dc:creator'];
            }

            if (blogPost.category instanceof String) {
                swap(blogPost.category);
            }

            if (blogPost.tags instanceof String) {
                swap(blogPost.tags);
            }

            saveBlogPost(blogPost);

            function swap(object) {
                var tempString = object;

                object = [];
                object.push(tempString)
            }
        }

        function saveBlogPost(basePost) {
            User.findOne({_id: "56a26f6ffdee4a9d9d7f1b74"}, function (error, user) {
                if (error) {
                    console.log(error);
                }
                else {
                    var blogPost = new BlogPost(basePost);
                    blogPost.user = user;

                    if (user) {

                    blogPost.save(function (error) {
                        if (error) {
                            console.log("There was an error");
                        }
                        else {
                            console.log("" + blogPost.title + "" + 'was successfully saved');
                        }
                    });
                }
                    else {
                        console.log("No user");
                    }
                }
            });
        }
    }
};