(function () {
    "use strict";

    angular.module('TunjiWeb', [
            'ngMaterial', 'ngMdIcons', 'ui.router',
            'ngtweet', 'ngAnimate', 'ngSanitize',
            'ngAria', 'duScroll'])
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
                state: 'ResumeController'
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
            app.currentMenu = app.menu[index];
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

        $mdThemingProvider.definePalette('TJprimary', {
            '50': '#a0fff6',
            '100': '#54ffef',
            '200': '#1cffea',
            '300': '#00d3bf',
            '400': '#00b5a4',
            '500': '#009688',
            '600': '#00776c',
            '700': '#005951',
            '800': '#003a35',
            '900': '#001c19',
            'A100': '#a0fff6',
            'A200': '#54ffef',
            'A400': '#00b5a4',
            'A700': '#005951',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 A100 A200'
        });

        $mdThemingProvider.definePalette('TJaccent', {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffd7d7',
            '300': '#ff8f8f',
            '400': '#ff7171',
            '500': '#ff5252',
            '600': '#ff3333',
            '700': '#ff1515',
            '800': '#f50000',
            '900': '#d70000',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ff7171',
            'A700': '#ff1515',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('TJprimary', {
                'default': '800',
                'hue-1': '50'
            })
            .accentPalette('TJaccent', {
                'default': '600',
                'hue-1': '50'
            });

        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')
    }

    function run() {
        "use strict";
    }

})();
