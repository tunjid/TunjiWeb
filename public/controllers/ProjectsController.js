(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('ProjectsController', ProjectsController)
        .run(run);

    ProjectsController.$inject = ['$timeout', '$stateParams'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function ProjectsController($timeout, $stateParams) {
        "use strict";

        $timeout(scrollToProject, 300);

        function scrollToProject() {
            var offset = 58; //pixels; adjust for floating menu, context etc
            var duration = 1000; //milliseconds

            if ($stateParams.project && $stateParams.project.id) {
                //Scroll to #some-id with 30 px "padding"
                //Note: Use this in a directive, not with document.getElementById
                var scrollContainer = angular.element(document.getElementById('projects-container'));
                var element = angular.element(document.getElementById($stateParams.project.id));
                scrollContainer.scrollToElement(element, offset, duration);
            }
        }
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('ProjectsController', {
                url: '/projects',
                templateUrl: 'public/views/projects.html',
                controller: 'ProjectsController as vm',
                params: {
                    project: null
                }
            });
    }

    function run() {
        "use strict";
    }

})();
