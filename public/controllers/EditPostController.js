(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('EditPostController', EditPostController)
        .run(run);

    EditPostController.$inject = ['$rootScope', '$stateParams'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function EditPostController($rootScope, $stateParams) {
        "use strict";

        var vm = this;
        vm.blogPost = $stateParams.blogPost;

        var content = $rootScope.TunjiWeb.getBlogPostBody(vm.blogPost);

        content = JSON.parse('"' + content + '"');
        content = $rootScope.TunjiWeb.insertLineBreaks(content);

        vm.postBody = '<div>' + content + '</div>';

        vm.disabled = false;
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('EditPostController', {
                url: '/editPost',
                templateUrl: 'public/views/editPost.html',
                controller: 'EditPostController as vm',
                params: {
                    blogPost: null
                }
            });
    }

    function run() {
        "use strict";
    }

})();
