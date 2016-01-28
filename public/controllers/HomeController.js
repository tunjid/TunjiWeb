(function () {
    "use strict";

    angular.module('TunjiWeb')
        .controller('HomeController', HomeController)
        .config(config)
        .run(run);

    HomeController.$inject = ['$rootScope', '$scope', '$state', 'BlogPostService'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function HomeController($rootScope, $scope, $state, BlogPostService) {
        "use strict";

        var vm = this;

        vm.getDate = $rootScope.TunjiWeb.getDate;

        vm.goToBlogPost = goToBlogPost;
        vm.recentProjects = getRecentProjects();

        vm.blogPosts = BlogPostService.query({limit: "3"});

        function goToBlogPost(blogPost) {
            $state.go('ViewPostController', {blogPost: blogPost});
        }

        function getRecentProjects() {
            var recentProjects = [];

            var projectSections = $scope.app.sections;

            projectSections.some(evaluateSection);

            return recentProjects;

            function evaluateSection(section) {
                var sectionProjects = section.projects;

                sectionProjects.some(appendProject);

                return recentProjects.length > 2;

                function appendProject(project) {
                    if (project.type === 'project') {
                        recentProjects.push(project);
                    }
                    return recentProjects.length > 2;
                }
            }
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
