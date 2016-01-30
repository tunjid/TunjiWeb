(function () {
    "use strict";
    angular.module('TunjiWeb')
        .directive('fabTransform', fabTransform);

    function fabTransform() {
        "use strict";
        return {
            restrict: 'A',
            link: function ($scope, $elem) {

                var previousScroll = 0;

                var fab = angular.element(document.querySelector('.app-fab'));

                /* Scroll event listener */
                $elem.bind("scroll", function () {
                    var currentScroll = $elem.scrollTop();

                    if (currentScroll > previousScroll) { // scrolling down
                        if (!fab.hasClass('hidden')) {
                            fab.addClass('hidden');
                        }
                    }
                    else { // Scrolling up
                        if (fab.hasClass('hidden')) {
                            fab.removeClass('hidden');
                        }
                    }

                    previousScroll = currentScroll;
                    $scope.$apply();
                });

            }
        };
    }
})();
