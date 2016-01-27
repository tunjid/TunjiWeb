(function () {
    "use strict";
    angular.module('TunjiWeb').factory('BlogPostService', BlogPosts);

    BlogPosts.$inject = ['$resource'];

    function BlogPosts($resource) {

        return $resource('api/blogPosts/:blogPostId',
            {
                blogPostId: '@_id'
            },
            {
                put: {
                    method: 'PUT'
                },
                getArchives: {
                    url: '/api/blogPosts/archives',
                    method: 'GET',
                    isArray: true
                },
                getTagsOrCategories: {
                    url: '/api/blogPosts/recentTags',
                    method: 'GET',
                    isArray: true
                }
            });
    }
})();