(function () {
    "use strict";
    angular.module('blogPosts').factory('BlogPostService', BlogPosts);

    BlogPosts.$inject = ['$resource'];

    function BlogPosts($resource) {

        return $resource('api/blogPosts/:blogPostId', {
                blogPostId: '@_id'
            },
            {
                put: {
                    method: 'PUT'
                }
            });
    }
})();