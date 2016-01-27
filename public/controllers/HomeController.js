(function () {
    "use strict";

    angular.module('TunjiWeb')
        .controller('HomeController', HomeController)
        .config(config)
        .run(run);

    HomeController.$inject = ['$rootScope','$state', 'BlogPostService'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function HomeController($rootScope, $state, BlogPostService) {
        "use strict";

        var vm = this;

        vm.getDate = $rootScope.TunjiWeb.getDate;
        vm.goToBlogPost = goToBlogPost;

        vm.blogPosts = BlogPostService.query({limit: "3"});

        function goToBlogPost(blogPost) {
            $state.go('ViewPostController', {blogPost: blogPost});
        }
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('HomeController', {
                url: '/home',
                templateUrl: 'public/views/home.html',
                controller: 'HomeController as vm'
            });
    }

    function run() {
        "use strict";
    }
})();
