(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('ResumeController', ResumeController)
        .run(run);

    ResumeController.$inject = [];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function ResumeController() {
        "use strict";
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('ResumeController', {
                url: '/resume',
                templateUrl: 'public/views/resume.html',
                controller: 'ResumeController as vm'
            });
    }

    function run() {
        "use strict";
    }

})();
