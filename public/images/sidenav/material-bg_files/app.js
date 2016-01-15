(function () {
    "use strict";

    angular.module('TunjiWeb', [
            'ngMaterial', 'ngMdIcons', 'ui.router',
            'ngtweet', 'ngAnimate', 'ngSanitize',
            'ngAria'])
        .config(config)
        .controller('AppController', AppController)
        .run(run);

    AppController.$inject = ['$state', '$mdSidenav', '$mdDialog'];
    config.$inject = ['$mdThemingProvider'];
    run.$inject = [];

    function AppController($state, $mdSidenav, $mdDialog) {
        "use strict";

        var app = this;

        app.isOpen = false;

        app.go = go;
        app.toggleSidenav = toggleSideNav;
        app.showAdd = showAdd;

        app.menu = [
            {
                link: '',
                title: 'Home',
                icon: 'home',
                state: 'HomeController'
            },
            {
                link: '',
                title: 'Projects',
                icon: 'group',
                state: 'ProjectsController'
            },
            {
                link: '',
                title: 'Resume',
                icon: 'assignment',
                state: 'HomeController'
            },
            {
                link: '',
                title: 'About',
                icon: 'info',
                state: 'HomeController'
            },
            {
                link: '',
                title: 'Blog',
                icon: 'mode_edit',
                state: 'HomeController'
            }
        ];

        app.currentMenu = app.menu[0];

        $state.go('HomeController');

        function go(state, index) {
            app.currentMenu = app.menu[index],
            $state.go(state);
        }

        function toggleSideNav(menuId) {
            $mdSidenav(menuId).toggle();
        }

        function showAdd(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'public/views/contactDialog.html',
                    targetEvent: ev
                })
                .then(function (answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.alert = 'You cancelled the dialog.';
                });
        }

        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }
    }

    function config($mdThemingProvider) {
        "use strict";

        var customBlueMap = $mdThemingProvider.extendPalette('teal', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });

        $mdThemingProvider.definePalette('custom', customBlueMap);

        $mdThemingProvider.theme('default')
            .primaryPalette('custom', {
                'default': '900',
                'hue-1': '50'
            })
            .accentPalette('pink');

        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')
    }

    function run() {
        "use strict";
    }

})();
