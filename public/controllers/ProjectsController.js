(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('ProjectsController', ProjectsController)
        .run(run);

    ProjectsController.$inject = [];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function ProjectsController() {
        "use strict";
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('ProjectsController', {
                url: '/projects',
                templateUrl: 'public/views/projects.html',
                controller: 'ProjectsController as vm'
            });
    }

    function run() {
        "use strict";
    }

})();
