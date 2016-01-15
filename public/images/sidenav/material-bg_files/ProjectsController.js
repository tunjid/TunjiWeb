(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('ProjectsController', ProjectsController)
        .run(run);

    ProjectsController.$inject = ['$location', '$anchorScroll'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function ProjectsController($location, $anchorScroll) {
        "use strict";

        var vm = this;

        vm.scrollTo = scrollTo;

        vm.sections =
            [
                {
                    id: '2015',
                    projects: [
                        {
                            type: 'title',
                            badge: 'public/images/projects/mf5-badge.png',
                            id: 'mf5'
                        },
                        {
                            type: 'project',
                            title: 'MyFab5 Restaurant Reviews',
                            content: '<p>I currently work as the lead Android Developer at MyFab5</p>',
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
                            type: 'title',
                            badge: 'public/images/projects/mi-badge.png',
                            id: 'mi',
                            image: 'public/images/projects/mi-proj.png'
                        },
                        {
                            type: 'project',
                            title: 'Dynamic Respiratory Impedance Volume Evaluation (DRIVE)',
                            content: '<p>I worked with a team of individuals to build a medical device that tracks critical ' +
                            'biometrics noninvasively using bluetooth low energy. The project has been completed and video overview ' +
                            'of it can be seen <a href="https://www.youtube.com/watch?v=qOqD4fKjAXw">here</a>.</p>' +
                            '<p>Things Learned/Learning:</p>' +
                            '<ul><li>BLE Communication</li><li>Android Application Writing</li><li>Real Time Data Acquistion and Display</li></ul>',
                            images: ['public/images/projects/ble-1.png', 'public/images/projects/ble-2.png'],
                            style: {
                                'color': '#41638D'
                            }
                        },
                        {
                            type: 'project',
                            title: 'MFG 503: Manufacturing Engineering Project',
                            content: '<p>Currently researching additive manufacturing processes with a PhD candidate.' +
                            ' Its amazing, plus I got to wire my first Arduino board.</p>' +
                            '<p>Things Learned/Learning:</p> <ul><li>Arduino Basics</li></ul>',
                            images: ['public/images/projects/mfe-1.png', 'public/images/projects/mfe-2.png', 'public/images/projects/mfe-3.png'],
                            style: {
                                'color': '#41638D'
                            }
                        },
                        {
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
                            type: 'title',
                            badge: 'public/images/projects/ou-badge.png',
                            id: 'ou',
                            image: 'public/images/projects/ou-proj.png'
                        },
                        {
                            type: 'project',
                            title: 'AME 4983: Undergraduate Research',
                            content: '<p>Studied the effects of high intensity pressure waves on the human ear. Utilized SolidWorks' +
                            ' and ANSYS (transient structural and CFX CFD modules) extensively.</p>' +
                            '<p>Things Learned:</p><ul><li>Generation of parasolid geometry from mesh data</li><li>CFD boundary conditions creation</li></ul>',
                            images: ['public/images/projects/glb-1.png'],
                            style: {
                                'color': '#BE254C'
                            }
                        },
                        {
                            type: 'project',
                            title: 'AME 4553: Capstone',
                            content: '<p>Iterated on prototype design for composite seats for multiple stage cementers. ' +
                            'As you can see in the images, when the seats fail, they do so in beautiful ways.</p>' +
                            '<p>Things Learned:</p><ul><li>Failure modes of filament wound composites</li></ul>',
                            images: ['public/images/projects/glb-1.png'],
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
                            type: 'project',
                            title: 'AME 3173: Heat Transfer',
                            content: '<p>Utilized numerical approximations to solve a transient heat transfer problem in a rectangular plate.' +
                            ' Code was written in Java with Eclispse as the IDE and data transferred to Microsoft Excel for plotting.</p>',
                            images: ['public/images/projects/glb-1.png'],
                            style: {
                                'color': '#BE254C'
                            }
                        },
                        {
                            type: 'project',
                            title: 'AME 4163: PreCapstone',
                            content: '<p>Worked in a team to create an autonomous track and field implement retrieving device. ' +
                            'Machine ran awesome till we burnt through our lowly rated cables; one new failure mode learned.</p>',
                            images: ['public/images/projects/glb-1.png'],
                            style: {
                                'color': '#BE254C'
                            }
                        }
                    ]
                }
            ];

        function scrollTo(htmlID) {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash(htmlID);

            // call $anchorScroll()
            $anchorScroll();
        }
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
