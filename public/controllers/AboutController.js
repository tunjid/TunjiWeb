(function () {
    "use strict";

    angular.module('TunjiWeb')
        .config(config)
        .controller('AboutController', AboutController)
        .run(run);

    AboutController.$inject = [];
    config.$inject = ['$stateProvider'];
    run.$inject = [];

    function AboutController() {
        "use strict";

        var vm = this;

        vm.content = [
            {
                type: 'title',
                content: 'Hello'
            },
            {
                type: 'paragraph',
                content: "<p>This website is a project I started two days after my final " +
                "exam as a Master's student at the University of Michigan to " +
                "give myself a new challenge. It also serves as an online resume " +
                "detailing my past and current projects. Since it's inception in " +
                "May 2014, it's grown to house my blog where I share " +
                "things I'm working on.</p>"
            },
            {
                type: 'title',
                content: 'About Me'
            },
            {
                type: 'paragraph',
                content: "<p>I am Adetunji Dahunsi and I love to build things. I'm extremely " +
                "passionate about design and technology and if I were to pick " +
                "two words that describe me, they would be eclecticism and " +
                "Kaizen. The former for my multidisciplinary education, and the " +
                "latter for the literal Japanese translation; never satisfied, " +
                "an approach I have towards self improvement.</p>" +
                "<p>I hold a Bachelor's Degree with special distinction In " +
                "Mechanical Engineering along with a Mathematics Minor from the " +
                "University of Oklahoma, and a Master's Degree in Manufacturing " +
                "Engineering from the University of Michigan.</p>" +
                "<p>For more information about me, please click on any of the " +
                "above buttons for my projects, resume, blog or leave me a " +
                "comment.</p>"
            },
            {
                type: 'title',
                content: 'Cool People'
            },
            {
                type: 'paragraph',
                content: '<p>To the excellent <a href="https://twitter.com/make_nova">Mayiawo' +
                "Aken'Ova</a> who set me on the path to becoming a Software Dev. Thanks man.</p>" +
                '<p>To both Sean Goodrich and Leonard Carrier, fellow students at' +
                "the University of Michigan. Sean's mastery of photoshop and design" +
                "skills motivated me to learn how to use Photoshop and build this" +
                'website and the same goes for Leonard.</p>' +
                "<p>To Barry Belmont for being an amazing mentor, dang. He's awesome.</p>" +
                '<p>To Lukonde Mulenga, for being an amazing and inspiring' +
                'friend.</p>'
            }
        ];
    }

    function config($stateProvider) {
        "use strict";

        $stateProvider
            .state('AboutController', {
                url: '/about',
                templateUrl: 'public/views/about.html',
                controller: 'AboutController as vm'
            });
    }

    function run() {
        "use strict";
    }

})();
