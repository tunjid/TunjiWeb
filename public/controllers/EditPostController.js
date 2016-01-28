(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('EditPostController', EditPostController)
        .run(run);

    EditPostController.$inject = ['$rootScope', '$state', '$stateParams', 'BlogPostService'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function EditPostController($rootScope, $state, $stateParams, BlogPost) {
        "use strict";

        var vm = this;
        vm.showResult = false;
        vm.savePost = savePost;
        vm.deletePost = deletePost;
        vm.querySearch = querySearch;

        vm.tagSearch = null;
        vm.selectedTag = null;
        vm.categorySearch = null;
        vm.selectedCategory = null;

        vm.allTags = BlogPost.getTagsOrCategories({type: 'tags'});
        vm.allCategories = BlogPost.getTagsOrCategories({type: 'categories'});

        vm.blogPost = $stateParams.blogPost;

        if (vm.blogPost) {
            init(vm);
        }
        else if (!vm.blogPost && $stateParams.blogPostId) {
            BlogPost.get({blogPostId: $stateParams.blogPostId}, function (blogPost) {
                vm.blogPost = blogPost;
                init(vm);
            });
        }
        else {
            vm.blogPost = new BlogPost();
            vm.blogPost.tags = [];
            vm.blogPost.categories = [];
        }

        function init(vm) {
            var content = $rootScope.TunjiWeb.getBlogPostBody(vm.blogPost);

            content = JSON.parse('"' + content + '"');
            content = $rootScope.TunjiWeb.insertLineBreaks(content);

            vm.postBody = content;
        }

        function savePost() {
            var stringifiedBody = JSON.stringify(vm.postBody);
            var subStringLength = stringifiedBody.length - 1;
            vm.blogPost.body = stringifiedBody.substring(1, subStringLength);

            if (vm.blogPost._id) {
                vm.blogPost.$put();
            }
            else vm.blogPost.$save();
        }

        function deletePost() {
            vm.blogPost.$delete()
                .then(function() {
                    $state.go('AllPostsController');
                });
        }

        /**
         * Search for tag or category.
         */
        function querySearch(query, list) {
            return query ? list.filter(createFilterFor(query)) : [];
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(category) {
                return angular.lowercase(category).indexOf(lowercaseQuery) === 0;
            };
        }
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('EditPostController', {
                url: '/edit/{blogPostId}',
                templateUrl: 'public/views/editPost.html',
                controller: 'EditPostController as vm',
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
