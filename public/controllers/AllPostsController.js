(function () {
    "use strict";

    angular.module('TunjiWeb')
        .controller('AllPostsController', AllPostsController)
        .config(config)
        .run(run);

    AllPostsController.$inject = ['$rootScope','$state', '$stateParams', 'BlogPostService', 'authService'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function AllPostsController($rootScope, $state, $stateParams, BlogPostService, authService) {
        "use strict";

        var vm = this;

        vm.authService = authService;

        vm.getDate = $rootScope.TunjiWeb.getDate;
        vm.getMonth = $rootScope.TunjiWeb.getMonth;

        vm.freeFormSearch = freeFormSearch;
        vm.goToBlogPost = goToBlogPost;
        vm.createPost = createPost;

        vm.title = 'All Blog Posts';
        vm.searchText = null;

        var queries = {limit: "30"};

        if ($stateParams.tag) {
            vm.title += ' tagged ' + $stateParams.tag;
            queries.tag = $stateParams.tag;
        }

        if ($stateParams.category) {
            vm.title += ' in category ' + $stateParams.category;
            queries.category = $stateParams.category;
        }

        if ($stateParams.monthYear) {
            // Annoyingly, MongoDB's months go from 1 - 12, not 0 - 11
            vm.title += ' published in ' +
                vm.getMonth($stateParams.monthYear.month - 1) +
                ' ' +
                $stateParams.monthYear.year;

            queries.month = $stateParams.monthYear.month - 1;
            queries.year = $stateParams.monthYear.year;
        }

        if ($stateParams.freeForm) {
            vm.title += ' matching the query ' + $stateParams.freeForm;
            queries.freeForm = $stateParams.freeForm;
        }

        vm.blogPosts = BlogPostService.query(queries);
        vm.archiveStats = BlogPostService.getArchives();
        vm.categories = BlogPostService.getTagsOrCategories({type: 'categories'});

        function goToBlogPost(blogPost) {
            $state.go('ViewPostController', {blogPost: blogPost});
        }

        function freeFormSearch($event) {
            if ($event.keyCode === 13)
                $state.go('AllPostsController', {freeForm: vm.searchText});
        }

        function createPost() {
            $state.go('EditPostController');
        }
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('AllPostsController', {
                url: '/blog',
                templateUrl: 'public/views/allPosts.html',
                controller: 'AllPostsController as vm',
                params: {
                    tag: null,
                    category: null,
                    monthYear: null,
                    freeForm: null
                }
            });
    }

    function run() {
        "use strict";
    }
})();
