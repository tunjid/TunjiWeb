(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('HomeController', HomeController)
        .run(run);

    HomeController.$inject = ['BlogPostService'];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function HomeController(BlogPostService) {
        "use strict";

        var vm = this;

        vm.getDate = getDate;

        vm.recentBlogPosts = BlogPostService.query({limit: "3"});

        vm.carouselPhotos = [
            '/public/images/home/home_main.png', '/public/images/home/home_mi.png',
            '/public/images/home/home_ou.png', '/public/images/home/home_arsenal.png'
        ];

        vm.content = [
            {
                type: 'title',
                content: 'Hello'
            },
            {
                type: 'paragraph',
                content: "This website is a project I started two days after my final " +
                "exam as a Master's student at the University of Michigan to " +
                "give myself a new challenge. It also serves as an online resume " +
                "detailing my past and current projects. Since it's inception in " +
                "May 2014, it's grown to house my wordpress blog where I share " +
                "things I'm working on. Go on, click the link in the top far " +
                "right."
            },
            {
                type: 'title',
                content: 'About Me'
            },
            {
                type: 'paragraph',
                content: " I am Adetunji Dahunsi and I love to build things. I'm extremely " +
                "passionate about design and technology and if I were to pick " +
                "two words that describe me, they would be eclecticism and " +
                "Kaizen. The former for my multidisciplinary education, and the " +
                "latter for the literal Japanese translation; never satisfied, " +
                "an approach I have towards self improvement." +
                "\n" +
                "I hold a Bachelor's Degree with special distinction In " +
                "Mechanical Engineering along with a Mathematics Minor from the " +
                "University of Oklahoma, and a Master's Degree in Manufacturing " +
                "Engineering from the University of Michigan." +
                "\n" +
                "For more information about me, please click on any of the " +
                "above buttons for my projects, resume, blog or leave me a " +
                "comment."
            }
        ];

        function getDate(blogPost) {
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            var date = new Date(Date.parse(blogPost.stringDate));

            return monthNames[date.getMonth()] +
                ' ' +
                date.getDate() +
                ', ' +
                date.getFullYear();
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
