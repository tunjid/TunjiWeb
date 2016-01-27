(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('ViewPostController', ViewPostController)
        .run(run);

    ViewPostController.$inject = ['$stateParams', 'BlogPostService'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function ViewPostController($stateParams, BlogPostService) {
        "use strict";

        var vm = this;
        vm.blogPost = $stateParams.blogPost;

        if (!vm.blogPost) {
             BlogPostService.get({blogPostId: $stateParams.blogPostId}, function (blogPost) {
                 vm.blogPost = blogPost;
            });
        }
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('ViewPostController', {
                url: '/blog/{blogPostId}',
                templateUrl: 'public/views/viewPost.html',
                controller: 'ViewPostController as vm',
                params: {
                    blogPostId: null,
                    blogPost: null
                },
                resolve: {
                    blogPost: function ($stateParams) {
                        if ($stateParams.blogPost) {
                            $stateParams.blogPostId = $stateParams.blogPost._id;
                        }
                    }
                }
            });
    }

    function run() {
        "use strict";
    }

})();
