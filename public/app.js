(function () {
    "use strict";

    angular.module('TunjiWeb', [
            'ngMaterial', 'ngMdIcons', 'ngCookies',
            'ngAnimate', 'ngResource', 'ngtweet',
            'ngSanitize', 'ngAria', 'ui.router',
            'duScroll', 'textAngular', 'gist-embed'])
        .controller('AppController', AppController)
        .config(config)
        .run(run);

    AppController.$inject = ['$rootScope', '$state', '$mdSidenav', '$mdDialog', 'authService'];
    config.$inject = ['$mdThemingProvider'];
    run.$inject = [];

    function AppController($rootScope, $state, $mdSidenav, $mdDialog, authService) {
        "use strict";

        var app = this;

        authService.getSession();

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState) {
                app.title = getTitle();
                app.currentState = toState.name;

                function getTitle() {
                    var lowerCase = toState.url.split('/')[1];
                    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
                }
            });

        $rootScope.TunjiWeb = {
            insertLineBreaks: insertLineBreaks,
            getBlogPostBody: getBlogPostBody,
            getMonth: getMonth,
            getDate: getDate
        };

        app.isOpen = false;
        app.originatorEv = null;

        app.go = go;
        app.toggleSidenav = toggleSideNav;
        app.openMenu = openMenu;
        app.contact = contact;
        app.signUp = signUp;
        app.signIn = signIn;
        app.fabClass = fabClass;

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
                state: 'AboutController'
            },
            {
                link: '',
                title: 'Blog',
                icon: 'mode_edit',
                state: 'AllPostsController'
            }

        ];


        $state.go('HomeController');

        function go(state) {
            app.toggleSidenav();
            $state.go(state);
        }

        function toggleSideNav(menuId) {
            $mdSidenav(menuId).toggle();
        }

        function contact(ev) {
            $mdDialog.show({
                    clickOutsideToClose: true,
                    controller: DialogController,
                    templateUrl: 'public/views/contactDialog.html',
                    targetEvent: ev
                });

            function DialogController($scope, $mdDialog) {

                $scope.commentBody = {
                    "firstName": '',
                    "lastName": '',
                    "email": '',
                    "comment": ''
                };

                $scope.sendComment = function () {
                    authService.sendComment($scope.commentBody);
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            }
        }

        function signIn() {

            $mdDialog.show({
                    targetEvent: app.originatorEv,
                    clickOutsideToClose: true,
                    controller: DialogController,
                    templateUrl: 'public/views/signInDialog.html'
                });

            function DialogController($scope, $mdDialog) {

                $scope.oldUser = {
                    "username": "",
                    "password": ""
                };

                $scope.signIn = function () {
                    authService.signIn($scope.oldUser);
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.keyDown = function ($event) {
                    if ($event.keyDown === 13) $scope.signIn();
                }
            }
        }

        function signUp() {

            $mdDialog.show({
                    targetEvent: app.originatorEv,
                    clickOutsideToClose: true,
                    controller: DialogController,
                    templateUrl: 'public/views/signUpDialog.html'
                });

            function DialogController($scope, $mdDialog) {

                $scope.newUser = {
                    "firstName": "",
                    "lastName": "",
                    "username": "",
                    "email": "",
                    "password": ""
                };

                $scope.signUp = function () {
                    authService.signUp($scope.newUser);
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            }
        }

        function openMenu($mdOpenMenu, ev) {
            app.originatorEv = ev;
            $mdOpenMenu(ev);
        }

        function fabClass() {
            return app.currentState == 'ResumeController'
                ? 'app-fab.hide'
                : 'app-fab';
        }

        function insertLineBreaks(jsonString) {
            return jsonString.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }

        function getDate(blogPost) {
            var date = new Date(Date.parse(blogPost.stringDate));

            return getMonth(date.getMonth()) +
                ' ' +
                date.getDate() +
                ', ' +
                date.getFullYear();
        }

        function getMonth(index) {
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            return monthNames[index];
        }

        function getBlogPostBody(blogPost) {
            return !blogPost
                ? '.'
                : !blogPost.body
                ? '.'
                : blogPost.body;
        }

        app.sections =
            [
                {
                    id: '2015',
                    projects: [
                        {
                            id: 'mf5',
                            type: 'title',
                            badge: 'public/images/projects/mf5-badge.png'
                        },
                        {
                            id: 'myfab5',
                            type: 'project',
                            title: 'MyFab5 Restaurant Reviews',
                            content: '<p>I currently work as a Software Developer at MyFab5</p>' +
                            '<p>Things Learned:</p>' +
                            '<ul><li>Asyncronous operations in Android with RxJava</li>' +
                            '<li>Location aware Android services</li>' +
                            '<li>AngularJS and the Ionic Framework</li></ul>',
                            images: ['public/images/projects/mf5-1.png', 'public/images/projects/mf5-2.png', 'public/images/projects/mf5-3.png'],
                            style: {
                                'color': '#008080'
                            }
                        }
                    ]
                },
                {
                    id: '2014',
                    projects: [
                        {
                            id: 'mi',
                            type: 'title',
                            badge: 'public/images/projects/mi-badge.png',
                            image: 'public/images/projects/mi-proj.png'
                        },
                        {
                            id: 'drive',
                            type: 'project',
                            title: 'Dynamic Respiratory Impedance Volume Evaluation (DRIVE)',
                            content: '<p>I worked with a team of individuals to build a medical device that tracks critical ' +
                            'biometrics noninvasively using bluetooth low energy. The project has been completed and video overview ' +
                            'of it can be seen <a href="https://www.youtube.com/watch?v=qOqD4fKjAXw">here</a>.</p>' +
                            '<p>Things Learned:</p>' +
                            '<ul><li>BLE Communication</li><li>Android Application Writing</li><li>Real Time Data Acquistion and Display</li></ul>',
                            images: ['public/images/projects/ble-1.png', 'public/images/projects/ble-2.png'],
                            style: {
                                'color': '#41638D'
                            }
                        },
                        {
                            id: 'mfg503',
                            type: 'project',
                            title: 'MFG 503: Manufacturing Engineering Project',
                            content: '<p>Researched additive manufacturing processes with a PhD candidate.' +
                            ' Its amazing, plus I got to wire my first Arduino board.</p>' +
                            '<p>Things Learned:</p> <ul><li>Arduino Basics</li></ul>',
                            images: ['public/images/projects/mfe-1.png', 'public/images/projects/mfe-2.png', 'public/images/projects/mfe-3.png'],
                            style: {
                                'color': '#41638D'
                            }
                        },
                        {
                            id: 'mfg502',
                            type: 'project',
                            title: 'MFG 502: Manufacturing System Design',
                            content: '<p>Worked in a team to design a hypothetical industrialized large scale manufacturing' +
                            ' plant for cheap sanitary towels that are currently hand made.</p>' +
                            '<p>Things Learned:</p><ul><li>Line Balancing</li></ul>',
                            images: ['public/images/projects/sys-1.png', 'public/images/projects/sys-2.png', 'public/images/projects/sys-3.png'],
                            style: {
                                'color': '#41638D'
                            }
                        }
                    ]
                },
                {
                    id: '2013',
                    projects: [
                        {
                            id: 'me587',
                            type: 'project',
                            title: 'ME 587: Sustainable Design',
                            content: '<p>Worked in a team to develop a connected system of ecoefficient lawn care devices.' +
                            ' Great learning experience, plus <a href="http://steve-skerlos.org/">professor Skerlos</a> ' +
                            'was awesome. I still keep the poster for sentimental reasons.</p>',
                            images: ['public/images/projects/sus-1.png', 'public/images/projects/sus-2.png', 'public/images/projects/sus-3.png'],
                            style: {
                                'color': '#41638D'
                            }
                        },
                        {
                            id: 'me586',
                            type: 'project',
                            title: 'ME 586: Global Manufacturing',
                            content: '<p>Worked in a team to create a hypothetical manufacturing layout for 3D printed customizable earbuds. ' +
                            'I designed the mockup CAD model you see in the image to the left. Despite its simplicity, I\'m immensely proud of it.</p>',
                            images: ['public/images/projects/glb-1.png'],
                            style: {
                                'color': '#41638D'
                            }
                        },
                        {
                            id: 'ou',
                            type: 'title',
                            badge: 'public/images/projects/ou-badge.png',
                            image: 'public/images/projects/ou-proj.png'
                        },
                        {
                            id: 'ame4983',
                            type: 'project',
                            title: 'AME 4983: Undergraduate Research',
                            content: '<p>Studied the effects of high intensity pressure waves on the human ear. Utilized SolidWorks' +
                            ' and ANSYS (transient structural and CFX CFD modules) extensively.</p>' +
                            '<p>Things Learned:</p><ul><li>Generation of parasolid geometry from mesh data</li><li>CFD boundary conditions creation</li></ul>',
                            images: ['public/images/projects/und-1.png', 'public/images/projects/und-2.png', 'public/images/projects/und-3.png', 'public/images/projects/und-4.png'],
                            style: {
                                'color': '#BE254C'
                            }
                        },
                        {
                            id: 'ame4553',
                            type: 'project',
                            title: 'AME 4553: Capstone',
                            content: '<p>Iterated on prototype design for composite seats for multiple stage cementers. ' +
                            'As you can see in the images, when the seats fail, they do so in beautiful ways.</p>' +
                            '<p>Things Learned:</p><ul><li>Failure modes of filament wound composites</li></ul>',
                            images: ['public/images/projects/cap-1.png', 'public/images/projects/cap-2.png', 'public/images/projects/cap-3.png', 'public/images/projects/cap-4.png'],
                            style: {
                                'color': '#BE254C'
                            }
                        }
                    ]
                },
                {
                    id: '2012',
                    projects: [
                        {
                            id: 'ame3173',
                            type: 'project',
                            title: 'AME 3173: Heat Transfer',
                            content: '<p>Utilized numerical approximations to solve a transient heat transfer problem in a rectangular plate.' +
                            ' Code was written in Java with Eclispse as the IDE and data transferred to Microsoft Excel for plotting.</p>',
                            images: ['public/images/projects/htt-1.png', 'public/images/projects/htt-2.png', 'public/images/projects/htt-3.png', 'public/images/projects/htt-4.png'],
                            style: {
                                'color': '#BE254C'
                            }
                        },
                        {
                            id: 'ame4163',
                            type: 'project',
                            title: 'AME 4163: PreCapstone',
                            content: '<p>Worked in a team to create an autonomous track and field implement retrieving device. ' +
                            'Machine ran awesome till we burnt through our lowly rated cables; one new failure mode learned.</p>',
                            images: ['public/images/projects/pcp-1.png', 'public/images/projects/pcp-2.png', 'public/images/projects/pcp-3.png', 'public/images/projects/pcp-4.png'],
                            style: {
                                'color': '#BE254C'
                            }
                        }
                    ]
                }
            ];
    }

    function config($mdThemingProvider) {
        "use strict";

        var customTeal = $mdThemingProvider.extendPalette('teal', {
            '500': '000000'
        });

        $mdThemingProvider.definePalette('TJprimary', {
            '50': '#a7b8c1',
            '100': '#7a94a2',
            '200': '#5d7886',
            '300': '#40525c',
            '400': '#34424a',
            '500': '#273238',
            '600': '#1a2226',
            '700': '#0e1214',
            '800': '#010202',
            '900': '#000000',
            'A100': '#a7b8c1',
            'A200': '#7a94a2',
            'A400': '#34424a',
            'A700': '#0e1214',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 A100 A200'
        });

        $mdThemingProvider.definePalette('TJaccent', {
            '50': '#ffffff',
            '100': '#f4dcda',
            '200': '#e6b4af',
            '300': '#d58179',
            '400': '#ce6b61',
            '500': '#c7554a',
            '600': '#b94539',
            '700': '#a23c32',
            '800': '#8a332b',
            '900': '#732b24',
            'A100': '#ffffff',
            'A200': '#f4dcda',
            'A400': '#ce6b61',
            'A700': '#a23c32',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
        });

        $mdThemingProvider.definePalette('customTeal', customTeal);


        $mdThemingProvider.theme('default')
            .primaryPalette('TJprimary', {
                'default': '500'
            })
            .accentPalette('TJaccent', {
                'default': '500',
                'hue-1': '50'
            });

        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey');

        $mdThemingProvider.theme('altTheme')
            .primaryPalette('customTeal', {
                'default': '500',
                'hue-1': '50'
            });

        $mdThemingProvider.theme('search-bar', 'default')
            .primaryPalette('TJprimary')
            .dark();
    }

    function run() {
        "use strict";
    }
})();
